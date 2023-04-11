import React from "react";
import styled from "styled-components";
import CourseButton from "./CourseButton";
import userIcon from "../assets/user-icon.png";
import settingsIcon from "../assets/settings-icon.jpg";

interface SidebarProps {
  courses: { imageSrc: string; tooltipText: string; onClick: () => void }[];
  username: string;
}

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CourseButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 70px
`;


const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const SettingsIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 5px;
`;

const Sidebar: React.FC<SidebarProps> = ({ courses, username }) => {
  return (
    <SidebarWrapper>
      <CourseButtonContainer>
        {courses.map((course) => (
          <CourseButton {...course} />
        ))}
      </CourseButtonContainer>
      <ProfileSection>
        <ProfilePic src="profile-pic.png" />
        <ProfileInfo>
          username
          <SettingsIcon src="settings-icon.png" />
        </ProfileInfo>
      </ProfileSection>
    </SidebarWrapper>
  );
};

export default Sidebar;