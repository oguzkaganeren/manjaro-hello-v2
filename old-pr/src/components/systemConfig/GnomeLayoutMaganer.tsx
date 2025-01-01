import {
  Modal,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  useColorModeValue,
  ModalFooter,
  Image,
  SimpleGrid,
  Heading,
  VStack,
  IconButton,
  Tooltip,
  Card,
} from '@chakra-ui/react';
import { configDir } from '@tauri-apps/api/path';
import { exists, readTextFile } from '@tauri-apps/plugin-fs';
import {
  useRef, FC, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Command } from '@tauri-apps/plugin-shell';
import { SettingsIcon } from '@chakra-ui/icons';
import commands from '../../assets/Commands';

const GnomeLayoutManager: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const LAYOUTS = ['gnome', 'manjaro', 'material-shell', 'traditional'];
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState('');
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const btnBg = useColorModeValue('green.100', 'green.900');
  const btnBorder = useColorModeValue('gray.800', 'gray.500');
  function buttonBgColor(layout: string) {
    return isSelected === layout
      ? btnBg
      : 'transparent';
  }
  useEffect(() => {
    const getLocalData = async () => {
      const configDirPath = await configDir();
      const confPath = `${configDirPath}gnome-layout-switcher.conf`;
      if (await exists(confPath) as unknown as boolean) {
        const contents = await readTextFile(confPath);
        const layout = contents.replace('[SETTING]', '').replace(/(\r\n|\n|\s|\r)/gm, '').split('=')[1];
        setIsSelected(layout);
      }
    };
    getLocalData();
  }, []);
  return (
    <>
      <Card
        size="sm"
      >
        <Button width="100%" height="20" variant="ghost" onClick={onOpen}>
          {t('gnomeLayoutSwitcher')}
        </Button>
      </Card>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        size="lg"
        onClose={onClose}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            {t('gnomeLayoutSwitcher')}
            <Tooltip label={t('advanced')}>
              <IconButton
                size="md"
                ml={25}
                aria-label={t('advanced')}
                icon={<SettingsIcon />}
                onClick={async () => {
                  Command.create(commands.getGLM.program).execute();
                }}
              />
            </Tooltip>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={2} spacing={10}>
              {LAYOUTS.map((layout) => (
                <Button
                  py="5"
                  px={{ base: 2, md: 4 }}
                  height="200px"
                  shadow="xl"
                  backgroundColor={
                    buttonBgColor(layout)
                  }
                  variant="outline"
                  border="1px solid"
                  borderColor={btnBorder}
                  rounded="lg"
                  onClick={async () => {
                    setIsSelected(layout);
                    Command.create(commands.getGLM.program, [
                      `apply-${layout}`,
                    ]).execute();
                  }}
                >
                  <VStack>
                    <Heading
                      as="h5"
                      size="sm"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {layout}
                    </Heading>
                    <Image
                      src={`${process.env.PUBLIC_URL}/GnomeLayouts/${layout}preview.svg`}
                      alt={layout}
                    />
                  </VStack>
                </Button>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};
export default GnomeLayoutManager;
