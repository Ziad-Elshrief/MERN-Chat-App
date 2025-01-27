import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ type, ...props }, ref) => {
  return (
    <input
      type={type}
      className="bg-white dark:bg-slate-800 mb-5 p-2 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300  rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";
