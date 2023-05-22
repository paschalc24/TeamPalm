// Import necessary libraries
import React from "react";
import styled from "styled-components";
import CourseButton from "./CourseButton";

// Define prop types for the Sidebar component
interface SidebarProps {
  courses: { imageSrc: string; tooltipText: string; onClick: () => void }[]; // Array of course objects
  username: string; // Current user's name
  selectedCourse: string; // Selected course
  setSelectedCourse: (course: string) => void; // Function to change selected course
  setSelectedMode: (course: string) => void; // Function to change selected mode
}

// Define the main wrapper for the sidebar
const SidebarWrapper = styled.div`
  position: sticky;
  height: 40vh;
  top: 108px; /* adjust as necessary */
  left: 0;
  bottom: 0;
  width: 105px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

// Define the scrollable view container
const ScrollViewContainer = styled.div`
  height: 100%;
  overflow-y: scroll;

  /* customize scrollbar styles */
  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

// Define the container for course buttons
const CourseButtonContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  padding-left: 50px;
`;

// Define the main Sidebar component:
// Contains course buttons to allow for switching between courses.
const Sidebar: React.FC<SidebarProps> = ({
  courses,
  username,
  selectedCourse,
  setSelectedCourse,
  setSelectedMode
}) => {
  return (
    <SidebarWrapper>
      <ScrollViewContainer>
        <CourseButtonContainer>
          {courses.map((course) => (
            <CourseButton
              {...course}
              key={Math.random()}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              setSelectedMode={setSelectedMode}
            />
          ))}
        </CourseButtonContainer>
      </ScrollViewContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;