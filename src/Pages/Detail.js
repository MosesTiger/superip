import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { readXlsxFile } from "../context/xlsxReader"; // xlsxReader 불러오기

const MovieInfo = styled.div`
  padding: 100px;
  margin-left: 40px;
  margin-right: 40px;
`;

const MovieTitle = styled.h1`
  font-size: 28px;
`;

const BackButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 30px;

  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 1px solid #ddd;
  width: 100%;
`;

const Container = styled.div`
  display: flex; 
  padding: 0px 10px;
  gap: 30px;
`

const Section = styled.div`
  display: flex;
  flex-direction:column;
  justify-content:space-between;
`

const MetaContainer = styled.div`
  display: flex;
  flex-direction:column;
  gap:5px;
`

const MovieMeta = styled.p`
  margin: 0;
  font-size: 14px;
  color: #c4c4c4;
`;

const MoviePoster = styled.img`
  width: 200px;
  height: auto;
  border-radius: 8px;
  margin-top: 20px;
  float: right;
`;

const PlotWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  color: #2c3e50;
  margin-top: 80px;
`;

const PlotTitle = styled.h2`
  font-size: 20px;
`;

const PlotText = styled.p`
  font-size: 14px;
`;

export default function Detail() {
  const { id } = useParams(); // URL에서 영화의 id를 가져옴
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await readXlsxFile(); // XLSX 파일에서 영화 데이터를 가져옴
      const movieData = data.find((movie) => movie.id === id); // ID로 해당 영화 검색
      setMovie(movieData); // 영화 데이터 설정
    };

    fetchMovie();
  }, [id]);
  
  const getGenderText = (gender) => {
    switch (gender) {
      case 0:
        return "남성";
      case 1:
        return "여성";
      case 2:
        return "혼성";
      default:
        return "정보 없음";
    }
  };

  const handleBackClick = () => {
    navigate("/search");
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <Header />
      <MovieInfo>
        <BackButton onClick={handleBackClick}>이전</BackButton>
        <MovieTitle>{movie.title}</MovieTitle>
          <Divider />
        <Container>
            <Section>
              <MetaContainer>
                <MovieMeta>{movie.genre}</MovieMeta>
                <MovieMeta>[ {movie.year} ]</MovieMeta>
                <MovieMeta>{movie.rating},  {movie.runtime}분,  {movie.nation}, {getGenderText(movie.gender)}</MovieMeta>
                <MovieMeta>감독   |   {movie.director}</MovieMeta>
              </MetaContainer>
              <PlotWrapper>
                <PlotTitle>Plot</PlotTitle>
                <PlotText>{movie.plot}</PlotText>
              </PlotWrapper>
            </Section>
            <MoviePoster src={movie.poster} alt={`${movie.title} 포스터`} />
        </Container>
      </MovieInfo>
    </div>
  );
}
