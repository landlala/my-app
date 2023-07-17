import { getUpcoming, IGetMoviesResult} from "../../../api";
import { useQuery } from "react-query";
import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import useWindowDimensions from "../../../useWindowDimensions";
import { makeImagePath } from "../../../utils";

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

function Upcoming() {
    const offset = 6;
    const {data, isLoading} = useQuery<IGetMoviesResult>(
        ["movies", "latest"],
        getUpcoming
    )
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
    };
    const width = useWindowDimensions();

    return (
      <Slider>
        <AnimatePresence initial = {false} onExitComplete = {toggleLeaving}>
            <button onClick = {increaseIndex}>next</button>
            <h1>UPCOMING</h1>
            <Row
                initial = {{x: width + 5}}
                animate = {{x: 0}}
                exit = {{x: -width - 5}}
                transition = {{type: "tween", duration: 1}}
                key = {index}
            >
                {data?.results.slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map(movie =>
                    <Box
                      key = {movie.id}
                      variants = {BoxVariants}
                      initial = "normal"
                      whileHover = "hover"
                      transition = {{type: "tween"}}
                      bgPhoto = {makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants = {infoVariants}><h4>{movie.title}</h4></Info>
                    </Box>
                  )}
            </Row>
        </AnimatePresence>
      </Slider>  
    );
}

export default Upcoming;