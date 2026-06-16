import type { Meta, StoryObj } from '@storybook/react';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { Modal } from '../Modal/Modal';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';

const meta: Meta<typeof Drawer> = { component: Drawer };
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Example: Story = {
  render: () => (
    <DialogTrigger>
      <Button>Open drawer</Button>
      <ModalOverlay isDismissable>
        <Modal>
          <Drawer size="20rem" className="p-4" aria-label="Example drawer">
            {({ close }) => (
              <div style={{ display: 'grid', gap: 12 }}>
                <p>Slide-over drawer content.</p>
                <Button onPress={close}>Close</Button>
              </div>
            )}
          </Drawer>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  ),
};
