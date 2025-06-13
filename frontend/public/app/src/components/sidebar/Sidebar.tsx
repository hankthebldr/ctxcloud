'use client';
import React, { PropsWithChildren } from 'react';

// Chakra UI components
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

// Custom components
import Content from '@/components/sidebar/components/Content';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { renderThumb, renderTrack, renderView } from '@/components/scrollbar/Scrollbar';

// Icons
import { IoMenuOutline } from 'react-icons/io5';

// Types & utilities
import { IRoute } from '@/types/navigation';
import { isWindowAvailable } from '@/utils/navigation';

// Sidebar props interface
export interface SidebarProps extends PropsWithChildren {
  routes: IRoute[];
  setApiKey?: (key: string) => void;
}

const Sidebar = ({ routes, setApiKey }: SidebarProps) => {
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const boxShadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
    'unset'
  );

  return (
    <Box display={{ base: 'none', xl: 'block' }} position="fixed" minH="100%">
      <Box
        bg={sidebarBg}
        transition="0.2s linear"
        w="285px"
        ms={{ sm: '16px' }}
        my={{ sm: '16px' }}
        h="calc(100vh - 32px)"
        borderRadius="14px"
        overflowX="hidden"
        boxShadow={boxShadow}
      >
        <Scrollbars
          universal
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content routes={routes} setApiKey={setApiKey} />
        </Scrollbars>
      </Box>
    </Box>
  );
};

export const SidebarResponsive = ({ routes }: { routes: IRoute[] }) => {
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const menuColor = useColorModeValue('gray.400', 'white');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex display={{ sm: 'flex', xl: 'none' }} align="center">
      <Icon
        as={IoMenuOutline}
        color={menuColor}
        w="20px"
        h="20px"
        me="10px"
        cursor="pointer"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement={
          isWindowAvailable() && document.documentElement.dir === 'rtl'
            ? 'right'
            : 'left'
        }
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent
          w="285px"
          maxW="285px"
          ms={{ sm: '16px' }}
          my={{ sm: '16px' }}
          borderRadius="16px"
          bg={sidebarBg}
        >
          <DrawerCloseButton
            zIndex="3"
            _focus={{ boxShadow: 'none' }}
            _hover={{ boxShadow: 'none' }}
          />
          <DrawerBody px="0" pb="0">
            <Scrollbars
              universal
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Sidebar;