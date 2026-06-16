import type { Meta, StoryObj } from '@storybook/react';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { Modal } from '../Modal/Modal';
import { Dialog } from '../Dialog/Dialog';
import { Button } from '../Button/Button';

// The overlay primitives (DialogTrigger / ModalOverlay / Modal / Dialog) only
// work composed together; this story renders the full tree. meta.component is
// Modal so its props table is generated here.
const meta: Meta<typeof Modal> = { component: Modal };
export default meta;
type Story = StoryObj<typeof Modal>;

export const Example: Story = {
  render: () => (
    <DialogTrigger>
      <Button>Open dialog</Button>
      <ModalOverlay isDismissable>
        <Modal>
          <Dialog aria-label="Example dialog">
            <p style={{ padding: 16 }}>Dialog content goes here.</p>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  ),
};
