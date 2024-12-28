import {
  Flex,
  Stack,
  IconButton,
  ButtonGroup,
  Spacer,
} from '@chakra-ui/react';
import React from 'react';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { BiWindow } from 'react-icons/bi';
import { MdOutlineMinimize } from 'react-icons/md';
import { invoke } from '@tauri-apps/api/core';
import { CloseIcon } from '@chakra-ui/icons';
import AppSettings from './appSetting/AppSettings';
import ThemeComponent from './ThemeComponent';
import StepButtons from './StepButtons';
const appWindow = getCurrentWebviewWindow()

const NavbarComponent: React.FC = () => (
  <Flex
    as="header"
    pos="fixed"
    top="0"
    w="full"
    boxShadow="sm"
    zIndex={998}
    bg="#edf3f8"
    _dark={{ bg: '#1A202C' }}
  >
    <div data-tauri-drag-region="" className="titlebar" />
    <Spacer />
    <Flex
      w="full"
      justifyContent="center"
      alignItems="center"
      marginLeft={{
        base: '-3em',
        md: '12em',
      }}
    >
      <StepButtons />
    </Flex>

    <Flex
      justify="flex-end"
      h={16}
      mr={5}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={2}>
        <ThemeComponent />
        <AppSettings />
        <ButtonGroup>
          <IconButton
            aria-label="Minimize"
            onClick={() => {
              appWindow.minimize();
            }}
            size="sm"
            icon={<MdOutlineMinimize />}
          />
          <IconButton
            aria-label="Window"
            onClick={() => {
              appWindow.toggleMaximize();
            }}
            size="sm"
            icon={<BiWindow />}
          />
          <IconButton
            aria-label="Close"
            onClick={async () => {
              invoke('hide_window');
            }}
            size="sm"
            icon={<CloseIcon />}
          />
        </ButtonGroup>
      </Stack>
    </Flex>
  </Flex>
);
export default NavbarComponent;
