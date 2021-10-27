import styled from 'styled-components';

const Wrapper = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #3397cf;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(60deg);
    }
    50% {
      transform: rotate(120deg);
    }
    75% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface SpinnerLoaderProps {
  height: string;
}

const SpinnerLoader = ({ height }: SpinnerLoaderProps) => {
  return (
    <Wrapper height={height}>
      <Spinner />
    </Wrapper>
  );
};

export default SpinnerLoader;
