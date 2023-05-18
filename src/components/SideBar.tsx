import React from "react";
import styled from "styled-components";
import CourseButton from "./CourseButton";
import userIcon from "../assets/user-icon.png";
import settingsIcon from "../assets/settings-icon.jpg";

interface SidebarProps {
  courses: { imageSrc: string; tooltipText: string; onClick: () => void }[];
  username: string;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  setSelectedMode: (course: string) => void;
}

const SidebarWrapper = styled.div`
  position: fixed;
  top: 70px; /* adjust as necessary */
  left: 0;
  bottom: 0;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

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

const CourseButtonContainer = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  padding-left: 50px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 5px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.darkBlue};
  text-align: center;
  line-height: 1.2;
`;

const SettingsIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 5px;
`;

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
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              setSelectedMode={setSelectedMode}
            />
          ))}
        </CourseButtonContainer>
      </ScrollViewContainer>
      <ProfileSection style={{ display: "-webkit-flex" }}>
        <ProfilePic src={userIcon} />
        <Name>{username}</Name>
        <SettingsIcon src={settingsIcon} />
      </ProfileSection>
    </SidebarWrapper>
  );
};

export default Sidebar;

/***************************** */
// import React, { useState } from "react";
// import styled from "styled-components";
// import CourseButton from "./CourseButton";
// import userIcon from "../assets/user-icon.png";
// import settingsIcon from "../assets/settings-icon.jpg";

// interface SidebarProps {
//   courses: { id: string; imageSrc: string; tooltipText: string; onClick: () => void }[];
//   username: string;
// }

// const SidebarWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   width: 80px;
//   background-color: ${({ theme }) => theme.colors.darkBlue};
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

// const CourseButtonContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   padding: 70px;
// `;

// const ProfileSection = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const ProfilePic = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   margin-right: 10px;
// `;

// const ProfileInfo = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Name = styled.span`
//   font-size: 16px;
//   font-weight: bold;
// `;

// const SettingsIcon = styled.img`
//   width: 20px;
//   height: 20px;
//   margin-top: 5px;
// `;

// const Sidebar: React.FC<SidebarProps> = ({ courses, username }) => {
//   const [activeCourse, setActiveCourse] = useState("");

//   const handleCourseButtonClick = (id: string) => {
//     setActiveCourse(id);
//     onClick();
//   };

//   return (
//     <SidebarWrapper>
//       <CourseButtonContainer>
//         {courses.map((course) => (
//           <CourseButton
//             imageSrc={course.imageSrc}
//             tooltipText={course.tooltipText}
//             onClick={() => {
//               handleCourseButtonClick(course.id);
//               course.onClick();
//             }}
//             active={course.id === activeCourse}
//             setActive={setActiveCourse}
//             id={course.id}
//           />
//         ))}
//       </CourseButtonContainer>
//       <ProfileSection>
//         <ProfilePic src="profile-pic.png" />
//         <ProfileInfo>
//           <Name>{username}</Name>
//           <SettingsIcon src="settings-icon.png" />
//         </ProfileInfo>
//       </ProfileSection>
//     </SidebarWrapper>
//   );
// };

// export default Sidebar;
