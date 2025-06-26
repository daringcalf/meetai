import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button, buttonVariants } from '@/components/ui/button';
import { JSX, useState } from 'react';
import { useIsMobile } from './use-mobile';

const useConfirm = (
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const isMobile = useIsMobile();

  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  if (isMobile) {
    const ConfirmDrawer = () => (
      <Drawer
        open={!!promise}
        onOpenChange={handleClose}
        // https://stackoverflow.com/questions/79421257/shadcn-sheet-with-dropdown-menu-gives-blocked-aria-hidden-on-an-element-because
        autoFocus={!!promise}
      >
        <DrawerContent>
          <div className='max-w-sm mx-auto'>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
              <DrawerDescription>{message}</DrawerDescription>
            </DrawerHeader>

            <DrawerFooter className='pb-12'>
              <Button variant='destructive' size='lg' onClick={handleConfirm}>
                Confirm
              </Button>
              <DrawerClose asChild>
                <Button variant='outline' size='lg' className='w-full'>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    );

    return [ConfirmDrawer, confirm];
  }

  const ConfirmAlertDialog = () => (
    <AlertDialog open={!!promise}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={buttonVariants({ variant: 'destructive' })}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [ConfirmAlertDialog, confirm];
};

export default useConfirm;
