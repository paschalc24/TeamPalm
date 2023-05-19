import React, { useState } from "react";
import styled from "styled-components";

interface CourseButtonProps {
  imageSrc: string;
  tooltipText: string;
  onClick: () => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  setSelectedMode: (course: string) => void;
}

const CourseButtonWrapper = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 50px;
  margin-top: 20px;
  margin-left: 30px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const CourseButtonImage = styled.img`
  width: 150%;
  height: 120%;
  object-fit: cover;
  border-radius: 50%
`;

const CourseButtonHighlight = styled.div<{ active: boolean }>`
  position: absolute;
  top: -5px;
  left: 2px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const CourseButtonTooltip = styled.div<{ visible: boolean }>`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  white-space: nowrap;
`;

const CourseButton: React.FC<CourseButtonProps> = ({
  imageSrc,
  tooltipText,
  onClick,
  selectedCourse,
  setSelectedCourse,
  setSelectedMode
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    setSelectedCourse(tooltipText);
    setSelectedMode("home")
  };

  return (
    <CourseButtonWrapper
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CourseButtonImage src={imageSrc} alt="button" />
      <CourseButtonHighlight active={selectedCourse == tooltipText} />
      <CourseButtonTooltip visible={isHovering}>
        {tooltipText}
      </CourseButtonTooltip>
    </CourseButtonWrapper>
  );
};

export default CourseButton;

/********************* */
// import React, { useState } from "react";
// import styled from "styled-components";

// interface CourseButtonProps {
//   imageSrc: string;
//   tooltipText: string;
//   onClick: () => void;
//   isActive: boolean;
//   setActive: (id: number) => void;
//   id: number;
// }

// const CourseButtonWrapper = styled.button`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 50px;
//   height: 50px;
//   margin-top: 20px;
//   border-radius: 50%;
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
//   &:focus {
//     outline: none;
//   }
// `;

// const CourseButtonImage = styled.img`
//   width: 100%;
//   height: 100%;
//   border-radius: 100%;
//   object-fit: cover;
// `;

// const CourseButtonHighlight = styled.div<{ active: boolean }>`
//   position: absolute;
//   top: -5px;
//   left: -5px;
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   border: 2px solid ${({ theme }) => theme.colors.blue};
//   opacity: ${({ active }) => (active ? 1 : 0)};
//   transition: opacity 0.2s ease-in-out;
// `;

// const CourseButtonTooltip = styled.div<{ visible: boolean }>`
//   position: absolute;
//   top: -30px;
//   left: 50%;
//   transform: translateX(-50%);
//   background-color: ${({ theme }) => theme.colors.blue};
//   color: ${({ theme }) => theme.colors.white};
//   padding: 5px 10px;
//   border-radius: 5px;
//   font-size: 12px;
//   font-weight: bold;
//   opacity: ${({ visible }) => (visible ? 1 : 0)};
//   pointer-events: none;
//   transition: opacity 0.2s ease-in-out;
// `;

// const CourseButton: React.FC<CourseButtonProps> = ({
//   imageSrc,
//   tooltipText,
//   onClick,
//   isActive,
//   setActive,
//   id,
// }) => {
//   const [isHovering, setIsHovering] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovering(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovering(false);
//   };

//   const handleClick = () => {
//     setActive(id);
//     onClick();
//   };

//   return (
//     <CourseButtonWrapper
//       onClick={handleClick}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <CourseButtonImage src={imageSrc} alt="button" />
//       <CourseButtonHighlight active={isActive} />
//       <CourseButtonTooltip visible={isHovering}>
//         {tooltipText}
//       </CourseButtonTooltip>
//     </CourseButtonWrapper>
//   );
// };

// export default CourseButton;