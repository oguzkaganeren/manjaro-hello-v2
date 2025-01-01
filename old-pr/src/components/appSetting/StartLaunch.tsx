import {
  Switch,
  HStack,
  Spacer,
  FormControl,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveResource, configDir } from '@tauri-apps/api/path';
import { copyFile, remove, exists } from '@tauri-apps/plugin-fs';
import { info } from '@tauri-apps/plugin-log';

const StartLaunch = (): JSX.Element => {
  const { t } = useTranslation();
  const [launch, setLaunch] = useState(false);
  const handleLaunchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLaunch(event.target.checked);
    const configDirPath = await configDir();
    if (event.target.checked) {
      const resourcePath = await resolveResource('resources/manjaro-starter.desktop');
      info(`${resourcePath} copy to ${configDirPath}autostart/manjaro-starter.desktop`);
      copyFile(resourcePath, `${configDirPath}autostart/manjaro-starter.desktop`);
    } else {
      info(`${configDirPath}autostart/manjaro-starter.desktop removed if it exists`);
      remove(`${configDirPath}autostart/manjaro-starter.desktop`);
    }
  };

  useEffect(() => {
    const getLocalData = async () => {
      const configDirPath = await configDir();
      if (await exists(`${configDirPath}autostart/manjaro-starter.desktop`) as unknown as boolean) {
        setLaunch(true);
      }
    };
    getLocalData();
  }, []);
  return (
    <FormControl
      py={4}
      px={8}
      mt={4}
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
      shadow="lg"
      rounded="lg"
    >
      <HStack>
        <span>{t('launchStart')}</span>
        <Spacer />
        <Switch
          isChecked={launch}
          onChange={handleLaunchChange}
          id="launch-start"
        />
      </HStack>
    </FormControl>
  );
};

export default StartLaunch;
