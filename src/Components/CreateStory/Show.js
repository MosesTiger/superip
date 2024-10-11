import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TextContent from "./TextContent";
import Graph from "./Graph";
import BoxofficeSection from "./BoxofficeSection";

const Section = styled.section`
  display: flex;
  padding: 10px 0;
  width: 95%;
  margin: 0 auto;
  font-size: 16px;
  color: #000;
  align-items: center;
  justify-content: center;
`;

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0;
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 67%; /* 가로 크기 확실히 지정 */
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transform: translateX(-20px);
`;

const DashboardSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 1); /* 오른쪽과 아래쪽에 섀도우 추가 */
`;

const TitleSection = styled(DashboardSection)`
  height: 480px;
  width: 30%;
`;

const Titleposter = styled.img`
  background-color: black;
  width: 100%;
  height: 60%;
`;

const Plot = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  padding: 10px;
  color: black;
  box-sizing: border-box;
  overflow: hidden;
`;

const TitleContent = styled.div`
  max-height: 100px;
  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: 17px;
  font-weight: bold;
  position: relative;
`;

const PenaltySection = styled(DashboardSection)`
  display: flex;
  justify-content: flex-start;
  gap: 10px; /* 각 div 간격 */
  color: white;
  width: 90%;
  height: 130px;
`;

const PenaltyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px; /* 각 div 간격 */
  align-items: center;
  color: white;
  width: 100%;
`;

const Divtitle = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  padding-left: 20px;
  padding-top: 8px;
  padding-bottom: 5px;
`;

const DivContent = styled.div`
  width: 100%;
  font-size: ${(props) =>
    props.content === "star" ||
    props.content === "first" ||
    props.content === "second"
      ? "30px"
      : "40px"};
  font-weight: bold;
  text-align: right;
  padding-right: 30px;
  display: flex;
  justify-content: flex-end; /* 수평 방향 오른쪽 정렬 */
  align-items: center; /* 수직 방향 중앙 정렬 */
  height: 100%; /* 부모 높이에 맞추기 */
`;

const Div1 = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  width: 20%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const Div2 = styled(Div1)`
  width: 30%;
`;

const Div3 = styled(Div1)`
  width: 20%;
`;

const Div4 = styled(Div1)`
  width: 20%;
`;

const Sectiontitlewrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Sectiontitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: black;
`;

const AnalysisSection = styled(DashboardSection)`
  width: 90%;
  height: 300px;
  align-items: center;
`;

const MoreButton = styled.button`
  padding: 3px 10px;
  font-size: 14px;
  background: none;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vw;
  height: 85vh;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
  z-index: 1000;
  overflow-y: auto;
  border: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

function Show() {
  const longText = `
    도시의 어두운 밤, 범죄가 만연한 거리에서 정의를 추구하는 한 남자의 이야기가 시작된다. 전직 형사였던 주인공은 가족을 잃은 후 범죄 조직에 대한 복수를 결심한다. 한편, 도시를 장악한 범죄 조직의 보스는 주인공의 끈질긴 추적에 맞서 싸울 준비를 한다. 고독한 싸움 속에서 주인공은 자신의 신념과 정의를 지키기 위해
    `;

  const [isAnalysisPopupOpen, setIsAnalysisPopupOpen] = useState(false);
  const [isBoxofficePopupOpen, setIsBoxofficePopupOpen] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    fetchPredictionData();
  }, []);

  const fetchPredictionData = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/success-rate/first_predict",
        {
          keyword: "범죄도시 5",
          genre: "액션",
          runtime: 120,
          gender: "남성",
          rating: "15세 이상",
          theme: "범죄",
        }
      );
      setPredictionData(response.data.evaluation);
    } catch (error) {
      console.error("Error fetching prediction data:", error);
    }
  };

  const toggleAnalysisPopup = () =>
    setIsAnalysisPopupOpen(!isAnalysisPopupOpen);
  const toggleBoxofficePopup = () =>
    setIsBoxofficePopupOpen(!isBoxofficePopupOpen);

  const isPopupOpen = isAnalysisPopupOpen || isBoxofficePopupOpen;

  return (
    <Section>
      <DashboardContainer>
        {isPopupOpen && (
          <Overlay
            onClick={() => {
              setIsAnalysisPopupOpen(false);
              setIsBoxofficePopupOpen(false);
            }}
          />
        )}
        <TitleSection>
          <Titleposter />
          <Plot>
            <TitleContent>Title:범죄도시 5</TitleContent>
            <TextContent content={longText} />
          </Plot>
        </TitleSection>
        <ResultContainer>
          <PenaltySection>
            <Sectiontitle>최종 흥행 분석표</Sectiontitle>
            <PenaltyContainer>
              <Div1>
                <Divtitle>예상 흥행 등급</Divtitle>
                <DivContent content="rating">A</DivContent>
              </Div1>
              <Div2>
                <Divtitle>예상 별점</Divtitle>
                <DivContent content="star">
                  <img
                    src="/별.svg"
                    alt="별"
                    style={{
                      width: "40px",
                      marginRight: "5px",
                      marginBottom: "5px",
                    }}
                  />
                  {/*{predictionData && (
                  <p>{predictionData["최종 흥행도"].average_score.toFixed(1)}</p>
                )}*/}
                  3.0 / 4.5
                </DivContent>
              </Div2>
              <Div3>
                <Divtitle>1차 흥행도 예측</Divtitle>
                <DivContent content="first">A</DivContent>
              </Div3>
              <Div4>
                <Divtitle>시나리오 완성도</Divtitle>
                <DivContent content="second">70%</DivContent>
              </Div4>
            </PenaltyContainer>
          </PenaltySection>
          <AnalysisSection>
            <Sectiontitlewrap>
              <Sectiontitle>시나리오 완성도 분석표</Sectiontitle>
              <MoreButton onClick={toggleAnalysisPopup}>분석 더보기</MoreButton>
            </Sectiontitlewrap>
            <Graph />
          </AnalysisSection>
          <BoxofficeSection onMoreClick={toggleBoxofficePopup} />
        </ResultContainer>
      </DashboardContainer>

      {isAnalysisPopupOpen && (
        <Popup>
          <CloseButton onClick={toggleAnalysisPopup}>닫기</CloseButton>
          <h2>시나리오 완성도 분석표 자세히 보기</h2>
          {/* Add detailed analysis content here */}
          <div>
            <p>1. 개연성</p>
            <p>
              평가: 70%
              <br />
              강점: 시나리오의 주요 사건들(주인공의 학창 시절, 사랑과 갈등,
              결혼식까지의 여정 등)은 현실적이고 이해 가능한 맥락 속에서
              전개됩니다. 특히 주인공이 재수를 통해 대학에 입학하고, 과거 사랑을
              다시 만나는 과정은 감정적으로 공감할 수 있는 부분이 많습니다.
              <br />
              약점: 일부 장면에서 등장인물의 행동 동기가 불분명하거나 갑작스럽게
              느껴집니다. 예를 들어, 주인공과 상대 캐릭터 간의 대화나 행동이
              때때로 다소 과장되거나 비현실적으로 느껴질 수 있습니다. 이는
              독자가 이야기 속에 몰입하는 데 방해가 될 수 있습니다.
            </p>

            <p>2. 기승전결</p>
            <p>
              평가: 75%
              <br />
              강점: 시나리오는 명확한 기승전결 구조를 가지고 있습니다. 시작
              부분에서는 주인공의 과거와 현재 상황을 잘 소개하고, 중반부에서는
              갈등과 사건들이 적절히 쌓이면서 긴장감을 유지합니다. 결말 부분에서
              갈등이 해소되면서 전체적인 스토리가 마무리됩니다.
              <br />
              약점: 결말로 갈수록 급작스러운 사건 전개나 해결이 이루어지는
              부분이 있습니다. 갈등의 해소가 다소 성급하게 이루어지는 느낌을
              주며, 독자가 충분히 감정을 따라가고 이해할 수 있는 시간을 주지
              않는 경우가 있습니다.
            </p>

            <p>3. 흐름</p>
            <p>
              평가: 80%
              <br />
              시나리오의 전반적인 흐름은 비교적 자연스럽고, 사건들이 시간의
              흐름에 따라 논리적으로 연결됩니다. 관객이 인물들의 감정 변화와
              사건 전개에 쉽게 몰입할 수 있으며, 중간중간 발생하는 갈등과
              사건들이 흥미를 유지시키는 데 효과적입니다. 다만, 후반부로 갈수록
              약간의 전개 속도 조절이 필요할 수 있습니다.
            </p>

            <p>4. 시나리오 완성도</p>
            <p>
              평가: 85%
              <br />
              강점: 전체적인 시나리오의 완성도는 높으며, 주요 사건과 캐릭터 간의
              상호작용이 잘 구성되어 있습니다. 특히 각 캐릭터의 성격과 동기들이
              잘 드러나며, 이를 통해 감정적인 공감대가 형성됩니다. 플롯의
              일관성과 주제 전달력이 뛰어나며, 전체적인 스토리 라인이 매끄럽게
              이어집니다.
              <br />
              약점: 다만, 일부 세부적인 사건의 전개에서 조금 더 깊이 있는
              설명이나 배경 정보가 제공되었으면 좋았을 부분이 있습니다. 예를
              들어, 특정 인물의 과거 또는 행동 동기를 더 구체적으로 다뤘다면 더
              설득력 있는 이야기가 되었을 것입니다.
            </p>
          </div>
        </Popup>
      )}

      {isBoxofficePopupOpen && (
        <Popup>
          <CloseButton onClick={toggleBoxofficePopup}>닫기</CloseButton>
          <h2>1차 흥행도 분석표 자세히 보기</h2>
          {/* Add detailed boxoffice analysis content here */}
          <div>
            <p>1. 장르</p>
            <p>
              평가: Good
              <br />
              코멘트: 로맨스/드라마 장르는 전 세계적으로 많은 히트작을
              배출했습니다. 대표적인 예로 "타이타닉", "노트북", "라라랜드" 등이
              있으며, 이들 영화는 전 세계적인 흥행을 기록했습니다. 로맨스와
              드라마가 결합된 장르는 다양한 연령층에게 감동을 주고, 꾸준한
              흥행력을 보여왔습니다. 따라서 이 장르 선택은 긍정적입니다.
            </p>

            <p>2. 상영시간</p>
            <p>
              평가: Excellent
              <br />
              코멘트: 가장 흥행한 영화들의 상영시간은 보통 2시간 내외입니다.
              "타이타닉", "아바타", "어벤져스" 시리즈 등 대부분의 흥행작들은
              2시간 30분 정도의 러닝타임을 가지고 있습니다. 이 시나리오도 1시간
              30분에서 2시간 사이의 상영시간을 가지게 될 것으로 보이므로, 이는
              일반적으로 흥행에 유리한 상영시간입니다.
            </p>

            <p>3. 관람등급</p>
            <p>
              평가: Normal
              <br />
              코멘트: 역대 흥행작 중 대부분의 영화는 PG-13(미국 기준, 한국에서는
              12세 또는 15세) 등급을 가지고 있습니다. 이는 광범위한 연령층을
              대상으로 하며, 관객층을 넓게 설정할 수 있습니다. 그러나 R등급(19세
              관람가) 영화들도 성인 관객을 타겟으로 하여 큰 성공을 거둔 사례가
              있습니다. 이 시나리오의 예상 등급(12세 또는 15세)은 관객층을 넓게
              설정할 수 있는 장점이 있지만, 특출난 요소가 없다면 흥행이 평범하게
              그칠 가능성도 있습니다.
            </p>

            <p>4. 배경국가</p>
            <p>
              평가: Good
              <br />
              코멘트: 이 영화의 주요 배경국가는 한국이며, 한국 영화 산업은 최근
              몇 년 동안 급격히 성장했습니다. 특히 "기생충"과 같은 작품은
              아카데미에서 큰 성공을 거두었고, 세계적인 인정을 받았습니다.
              한국의 역사, 문화, 도시 풍경 등은 글로벌 관객들에게도 신선하게
              다가올 수 있는 요소가 많습니다. 또한, 영화 배경이 한국이면서도
              보편적인 감정을 다루는 이야기는 국내외에서 흥행할 가능성을
              높여줍니다. 다만, 해외 시장을 타겟으로 할 경우, 지역적 특수성을
              고려한 마케팅이 필요할 것입니다.
            </p>
          </div>
        </Popup>
      )}
    </Section>
  );
}

export default Show;
