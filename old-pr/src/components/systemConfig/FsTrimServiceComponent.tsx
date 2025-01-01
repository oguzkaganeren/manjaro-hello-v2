import React, { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { info } from '@tauri-apps/plugin-log';
import {
  TagLabel,
  chakra,
  TagLeftIcon,
  Tag,
  IconButton,
  Tooltip,
  Card,
  Divider,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FiHardDrive } from 'react-icons/fi';
import { BsCheck } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { Command } from '@tauri-apps/plugin-shell';
import commandState from '../../stores/CommandStore';
import ConfirmPopComponent from '../common/ConfirmPopComponent';
import useToastCustom from '../../hooks/useToastCustom';
import commandLogger from '../common/CommandHelper';

const FsTrimServiceComponent = () => {
  const [isServiceActive, setIsServiceActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { callWarningToast } = useToastCustom();
  const { t } = useTranslation();
  const [commandHistory, setCommandHistory] = useRecoilState(commandState);

  const enableDisableCom = !isServiceActive
    ? ['enable', 'fstrim.timer']
    : ['disable', 'fstrim.timer'];
  const startStopCom = !isServiceActive
    ? ['start', 'fstrim.timer']
    : ['stop', 'fstrim.timer'];
  const printCmds = [`systemctl ${enableDisableCom.map((text) => `${text}`).join(' ')}`, `systemctl ${startStopCom.map((text) => `${text}`).join(' ')}`];

  function isServiceRunning() {
    invoke('is_service_active', {
      service: 'fstrim.timer',
    }).then((response) => {
      info(`Is Fstrim Service running: ${response}`);
      setIsServiceActive(response as boolean);
    });
  }
  function serviceHandler() {
    setCommandHistory([
      // with a new array
      ...commandHistory, // that contains all the old items
      printCmds.map((text) => `${text}`).join(' '), // and one new item at the end
    ]);
    const cmd = Command.create(
      'systemctl',
      enableDisableCom,
    );
    commandLogger(cmd);
    cmd.execute().then(() => {
      const ssCmd = Command.create(
        'systemctl',
        startStopCom,
      );
      commandLogger(ssCmd);
      ssCmd.execute().then((responseSt) => {
        const msg = responseSt.code === 0 ? t('fsTrimSuccess') : t('fsTrimFail');
        callWarningToast(responseSt.code === 0, msg);
        isServiceRunning();
        setProcessing(false);
      });
    });
  }
  useEffect(() => {
    isServiceRunning();
  }, []);
  const setServiceStatus = () => {
    setProcessing(true);
    serviceHandler();
  };
  return (
    <Card minH="2xs" variant="filled">
      <CardBody>
        <chakra.p mt={2}>{t('fstrimDesc')}</chakra.p>
      </CardBody>
      <Divider />
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Tooltip
          label={
            isServiceActive
              ? t('fstrimTimerDisableStop')
              : t('fstrimTimerEnableStart')
          }
        >
          <Tag
            mr={2}
            mt={2}
            shadow="base"
            colorScheme={isServiceActive ? 'whatsapp' : 'gray'}
          >
            <TagLeftIcon boxSize="12px" as={FiHardDrive} />

            <TagLabel>{t('fstrimTimerService')}</TagLabel>
            <ConfirmPopComponent
              confirmationDesc="confirmDesc"
              handleClick={setServiceStatus}
              portalEnabled={false}
              isButtonDisabled={false}
              commands={printCmds}
            >
              <IconButton
                ml={5}
                mr={-2}
                aria-label={t('fstrimTimerEnableStart')}
                isLoading={processing}
                icon={isServiceActive ? <AiFillCloseCircle /> : <BsCheck />}
              />
            </ConfirmPopComponent>
          </Tag>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default FsTrimServiceComponent;
