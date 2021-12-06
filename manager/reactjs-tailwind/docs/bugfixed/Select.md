# Bug with `<Select />` component

### **Describe**:

- The value default won't be appeared although you pass a value to `value` props
  of Component

### **Why did it happened?**

- Because you have to provide `options` props for first. No options it will
  never appear the default value for you.

### **Solution**

- Province `options` for props with at least 1 items, and make sure your default
  option will be in that
