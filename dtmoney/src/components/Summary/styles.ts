import styled from "styled-components";

const colors = {
  positive: "#33CC95",
  negative: "#E52E4D",
};
interface SummaryTotalProps {
  totalIsPositive: boolean;
}

export const SummaryTotal = styled.div<SummaryTotalProps>`
  transition: background 0.2s, color 0.2s;
  color: var(--white);
  background: ${({ totalIsPositive }) =>
    totalIsPositive ? colors.positive : colors.negative};
`;
