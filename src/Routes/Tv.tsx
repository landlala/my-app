import { IgetTvResult, getTvOnTheAir } from "../api";
import { makeImagePath } from "../utils";
import { useQuery } from "react-query";
import OnTheAir from "./Sliders/Tv/OnTheAir";
import AiringToday from "./Sliders/Tv/AiringToday";
import Popular from "./Sliders/Tv/Popular";
import TopRated from "./Sliders/Tv/TopRated";
import styled from "styled-components";

const Wrapper = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{bgPhoto: string}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${props => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 35px;
  width: 50%;
`;

function Tv() {
    const {data, isLoading} = useQuery<IgetTvResult>(
      ["tv", "ontheair"],
      getTvOnTheAir
    );
    return (
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Banner bgPhoto = {makeImagePath(data?.results[1].backdrop_path || "")}>
              <Title>{data?.results[1].name}</Title>
              <Overview>{data?.results[1].overview}</Overview>
            </Banner>
            <OnTheAir />
            <AiringToday />
            <Popular />
            <TopRated />
          </>
        )}
      </Wrapper>
    );
}

export default Tv;