# Dialog render everything in the first time although it is being closed

### **Describe**:

- I have a array data with 20 items, when I put it in the table, it will render
  first 10 items.
- all API of first 10 will be called although I don't open the dialog! that is
  crazy

### **Why did it happened?**

- Because that is how that `<Table />` component work. When it render first 10
  items, each cell will be render, include the Dialog which you pass an
  `editField` to it

### **Solution**

- **Case 1:** If you don't have to call any API in your Dialog, just go ahead,
  you don't have to fix anything.
- **Case 2:** If you have to call at least 1 API in your Dialog. So let fix it
  - Create a state `isOpenDialog`, pass it to array of useEffect, to make sure
    callback in `useEffect` will be call whenever we toggle to Dialog
  - In `useEffect` we won't do anything if `isOpenDialog === false` .Else just
    do everything
  - `setIsOpenDialog` when `Dialog` is toggled.
  - Now, Follow what I code bellow.

### **Code Example**

```tsx
const YourDialog: React.FC = () => {
  //.....
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  //....

  useEffect(() => {
    if (!isOpenDialog) return;

    callYourAPIHere();
    callYourAPIHere();
    callYourAPIHere();

  }, [isOpenDialog]);

  //....
  return (
    <Dialog
      onToggle={isOpen => setIsOpenDialog(isOpen)}
      //....
    >

    ....

    </Dialog>
  )
```
