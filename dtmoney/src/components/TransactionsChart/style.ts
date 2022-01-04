import styled from "styled-components";

interface BarFillProps {
  value: number;
  maxValue: number;
}

export const BarFill = styled.div<BarFillProps>`
  width: 1rem;
  height: ${({ value, maxValue }) =>
    value === 0 ? "0" : (value * 100) / maxValue}%;
  margin-top: auto;
  border-radius: 1rem;
  background: var(--blue);
  transition: height 0.2s;
`;
