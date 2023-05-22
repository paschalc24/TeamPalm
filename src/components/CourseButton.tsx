// Import necessary libraries and hooks
import React, { useState } from "react";
import styled from "styled-components";

// Define prop types for the CourseButton component
interface CourseButtonProps {
  imageSrc: string; // Source of the image to display on the button
  tooltipText: string; // Text to display in the tooltip
  onClick: () => void; // Function to execute on click
  selectedCourse: string; // Name of the selected course
  setSelectedCourse: (course: string) => void; // Function to change the selected course
  setSelectedMode: (course: string) => void; // Function to change the selected mode
}

// Define the CourseButton wrapper
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

// Define the CourseButton image component 
const CourseButtonImage = styled.img`
  width: 111%;
  height: 120%;
  object-fit: cover;
  border-radius: 50%
`;

// Define the CourseButton highlight styling for when the buttons are pressed 
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

// Define the CourseButton tooltip component for showing the course names when hovering over the button
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

// Define the CourseButton component:
// The individual course buttons that populate the sidebar component; allow for switching from course to course
const CourseButton: React.FC<CourseButtonProps> = ({
  imageSrc,
  tooltipText,
  onClick,
  selectedCourse,
  setSelectedCourse,
  setSelectedMode
}) => {
  // State variable to track whether the mouse is hovering over the button
  const [isHovering, setIsHovering] = useState(false);

  // Mouse enter handler
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Click handler
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
      {/* Highlight the button if it represents the selected course */}
      <CourseButtonHighlight active={selectedCourse == tooltipText} />
      {/* Tooltip text is visible when hovering over the button */}
      <CourseButtonTooltip visible={isHovering}>
        {tooltipText}
      </CourseButtonTooltip>
    </CourseButtonWrapper>
  );
};

// Export the CourseButton component as default
export default CourseButton;