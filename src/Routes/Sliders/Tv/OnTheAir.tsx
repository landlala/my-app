import { IgetTvResult, getTvOnTheAir } from "../../../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useWindowDimensions from "../../../useWindowDimensions";
import { makeImagePath } from "../../../utils";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

const Slider = styled(motion.div)`
    position: relative;
    top: -100px;
    margin-bottom: 250px;   
`;

const Box = styled(motion.div)<{bgPhoto: string}>`
  background-color: white;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &: first-child {
    transform-origin: center left;
  }
  &: last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: ${props => props.theme.black.lighter};
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${props => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${props => props.theme.white.lighter};
`;

const BoxVariants = {
        normal: {
          scale: 1
    },
    hover: {
        scale: 1.3,
        y: -50,
        transition: {
        delay: 0.5,
        duration: 0.3,
        type: "tween"
        }
    }
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween"
    }
  }
};

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

function OnTheAir() {
  const offset = 6;
  const {data, isLoading} = useQuery<IgetTvResult>(
      ["tv", "ontheair"],
      getTvOnTheAir
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const increaseIndex = () => {
      if (data) {
          if (leaving) return;
          toggleLeaving();
          const totalMovies = data.results.length - 2;
          const maxIndex = (totalMovies / offset) - 1;
          setIndex(prev => prev === maxIndex ? 0 : prev + 1);
      }
  }
  const width = useWindowDimensions();
  return (
      <Slider>
          <AnimatePresence initial = {false} onExitComplete = {toggleLeaving}>
              <button onClick = {increaseIndex}>next</button>
              <h1>ON THE AIR</h1>
              <Row
                  initial = {{x: width + 5}}
                  animate = {{x: 0}}
                  exit = {{x: -width - 5}}
                  transition = {{type: "tween", duration: 1}}
                  key = {index}
              >
                  {data?.results.slice(1)
                      .slice(offset * index, offset * index + offset)
                      .map(tv =>
                      <Box
                          layoutId = {tv.id + ""}
                          key = {tv.id}
                          variants = {BoxVariants}
                          initial = "normal"
                          whileHover = "hover"
                          transition = {{type: "tween"}}
                          bgPhoto = {makeImagePath(tv.backdrop_path, "w500")}
                      >
                          <Info variants = {infoVariants}><h4>{tv.name}</h4></Info>
                      </Box>    
                      )}
              </Row>
          </AnimatePresence>
      </Slider>
    );
}

export default OnTheAir;