import React from 'react';
import {
  Box,
  Button,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/plugin-shell';
import { useRecoilValue } from 'recoil';
import { liveState } from '../../stores/LiveStore';
import commands from '../../assets/Commands';

const LiveInstaller = () => {
  const { t } = useTranslation();
  const isLive = useRecoilValue(liveState);
  return (
    <Box>
      {isLive && (
        <Button
          fontWeight="700"
          rounded="md"
          size={['xs', 'sm', 'md', 'md']}
          variant="outline"
          colorScheme="whatsapp"
          onClick={async () => {
            Command.create(commands.getCalamaresPolkit.program).execute();
          }}
        >
          {t('installManjaroLinux')}
        </Button>
      )}
    </Box>
  );
};

export default LiveInstaller;
