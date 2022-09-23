import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tab
} from "@chakra-ui/react";
import {BackendSettings} from "@features/app-settings/BackendSettings";
import {HistorySettings} from "@features/app-settings/HistorySettings";
import {SettingsSettings} from "@features/app-settings/SettingsSettings";
import {RandomSettings} from "@features/app-settings/RandomSettings";
import {ImagePaneSettings} from "@features/app-settings/ImagePaneSettings";


export function AppSettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Settings</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Tabs>
                    <TabList>
                        <Tab>Backend</Tab>
                        <Tab>Random</Tab>
                        <Tab>Settings</Tab>
                        <Tab>Image Pane</Tab>
                        <Tab>History</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <BackendSettings/>
                        </TabPanel>
                        <TabPanel>
                            <RandomSettings/>
                        </TabPanel>
                        <TabPanel>
                            <SettingsSettings/>
                        </TabPanel>
                        <TabPanel>
                            <ImagePaneSettings/>
                        </TabPanel>
                        <TabPanel>
                            <HistorySettings/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </ModalBody>
        </ModalContent>
    </Modal>
}