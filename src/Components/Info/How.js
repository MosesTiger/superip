import React from "react";
import styled from "styled-components";

const SubTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const SubSubTitle = styled.h4`
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
`;

const Divider = styled.hr`
  width: 100%;
  border: 1px solid #000;
  margin: 40px 0; /* 위아래 여백 */
`;

export default function How() {
  return (
    <>
      <SubTitle>1. Create Story</SubTitle>
      <Paragraph>
        Create Story 페이지에서는 새로운 스토리를 제작할 수 있습니다. 창의적인
        아이디어를 구체화하고, 캐릭터와 플롯을 설계하며, 당신만의 이야기를
        시작해 보세요. 이 페이지는 초안을 작성하고, 아이디어를 구조화하여
        독창적인 스토리를 완성할 수 있는 모든 도구를 제공합니다. 시작 버튼을
        눌러, 새로운 작품을 만들어 보세요!
      </Paragraph>

      <SubTitle>2. Recent Story</SubTitle>
      <Paragraph>
        Recent Story 페이지에서는 당신이 최근에 작업했던 스토리로 쉽게 이동할 수
        있습니다. 중단했던 지점에서 작업을 재개하고, 이전에 작성한 내용을
        확인하며, 편집을 이어갈 수 있습니다. 마지막으로 작업한 스토리로 신속하게
        돌아가서 창작의 흐름을 유지하세요.
      </Paragraph>

      <SubTitle>3. Story Archive</SubTitle>
      <Paragraph>
        Story Archive 페이지는 모든 완성된 스토리와 작업 중인 스토리를 보관하는
        공간입니다. 과거에 작성한 작품들을 한눈에 살펴볼 수 있으며, 필요할 때
        언제든지 열어보고 편집할 수 있습니다. 또한, 보관된 시나리오들을 정리하고
        관리하여 당신의 창작물을 안전하게 보관하세요.
      </Paragraph>

      <SubTitle>4. Recommend</SubTitle>
      <Paragraph>
        Recommend 페이지에서는 역대 흥행작 Top 100을 추천해 드립니다. 성공적인
        작품들을 참고하여 영감을 얻고, 트렌드를 파악하세요. 이 페이지는 흥행에
        성공한 다양한 장르의 영화와 시나리오를 소개하며, 당신의 창작에 도움이 될
        만한 자료를 제공합니다. 성공적인 스토리를 탐구하며, 당신만의 히트작을
        만들어 보세요!
      </Paragraph>

      <Divider />

      <SubTitle>시나리오 제작 방법</SubTitle>
      <Paragraph>
        <SubSubTitle>1. 1차 흥행도에 필요한 키워드 선택</SubSubTitle>
        먼저, 스토리의 1차 흥행도를 예측하기 위해 필요한 키워드를 선택합니다.
        장르, 상영시간, 관람등급, 배경국가 등 중요한 요소들을 설정하여 스토리의
        기본 틀을 잡아보세요. 이 키워드들은 스토리의 초기 흥행 가능성을 평가하는
        데 중요한 역할을 합니다.
      </Paragraph>

      <Paragraph>
        <SubSubTitle>2. 1차 흥행도 예측</SubSubTitle> 선택한 키워드를 바탕으로,
        스토리의 1차 흥행도를 예측합니다. 이 단계에서는 역대 흥행작들의 데이터를
        분석하여, 당신의 스토리가 얼마나 성공 가능성이 있는지 평가해줍니다. 예측
        결과를 참고하여 스토리의 방향성을 조정할 수 있습니다.
      </Paragraph>

      <Paragraph>
        <SubSubTitle>3. 시놉시스 생성 및 수정</SubSubTitle>
        시놉시스를 생성하여 스토리의 전체적인 줄거리를 작성합니다. 필요한 경우,
        시놉시스를 수정하고 구체화하여 이야기의 방향성과 주요 사건을 명확히
        합니다.
      </Paragraph>

      <Paragraph>
        <SubSubTitle>4. 시나리오 생성</SubSubTitle>
        스토리의 흐름에 맞게 본격적인 시나리오를 생성합니다. 각 장면을 구성하고,
        대화와 액션을 추가하여 이야기를 완성해나갑니다. 여기서는 캐릭터의
        감정선과 사건의 전개를 중요하게 고려합니다.
      </Paragraph>

      <Paragraph>
        <SubSubTitle>5. 챕터 별 수정 및 시나리오 완성</SubSubTitle>
        생성된 시나리오를 챕터별로 검토하고 수정합니다. 각 챕터의 흐름과
        연결성을 유지하면서 필요한 부분을 보완하여 시나리오를 완성해나갑니다.
      </Paragraph>

      <Paragraph>
        <SubSubTitle>6. 시나리오 완성도 분석 및 최종 흥행도 분석</SubSubTitle>
        시나리오의 완성도는 3가지 요소로 분석됩니다:
        <br />
        <br />
        <strong>개연성:</strong> 이야기의 전개가 논리적이며, 사건들이 자연스럽게
        연결되는지 분석합니다.
        <br />
        <strong>기승전결:</strong> 이야기의 시작, 전개, 절정, 결말이 명확하게
        구분되며, 흐름이 매끄러운지 평가합니다.
        <br />
        <strong>흐름:</strong> 전체적인 이야기의 흐름이 균형 잡혀 있는지,
        감정선이 유지되며 독자가 몰입할 수 있는지 확인합니다.
        <br />
        <br />
        최종적으로, 시나리오의 완성도와 흥행 가능성을 예측하여 수정 및 보완할 수
        있는 정보를 제공합니다.
      </Paragraph>

      <Paragraph>
        <SubSubTitle>7. 알맞는 포스터 제공</SubSubTitle>
        완성된 시나리오에 맞는 포스터를 제공합니다. 각 시나리오의 분위기와
        장르에 어울리는 디자인으로, 독자의 시선을 끌 수 있는 포스터를
        추천합니다.
      </Paragraph>
    </>
  );
}
