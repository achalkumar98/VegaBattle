const questions = [
    {
      id: 1,
      description: 'Fix the bug in the JavaScript function that should return the sum of two numbers.',
      code: `
        function add(a, b) {
          return a - b; // Bug: should be a + b
        }
      `,
      solution: 'Replace the subtraction operator (-) with an addition operator (+).'
    },
    {
      id: 2,
      description: 'Fix the bug in the Python function that should reverse a string.',
      code: `
        def reverse_string(s):
            return s[::-1]  # Bug: slice syntax is correct, but remove incorrect slicing
      `,
      solution: 'Ensure the function correctly uses Python slicing to reverse the string.'
    },
    {
      id: 3,
      description: 'Identify and fix the bug in the HTML snippet causing the button not to work.',
      code: `
        <button onclick="alert('Button clicked!')">Click Me</button>
        <script>
          document.querySelector('button').addEventListener('click', function() {
            alert('Button clicked!');
          }); // Bug: Event listener conflicts with inline onclick handler
        </script>
      `,
      solution: 'Remove the inline onclick attribute or the redundant event listener to prevent conflicts.'
    },
    {
      id: 4,
      description: 'Fix the bug in the SQL query that should return all employees older than 30.',
      code: `
        SELECT * FROM employees WHERE age = 30; -- Bug: should be greater than 30
      `,
      solution: 'Replace "=" with ">" to correctly filter employees older than 30.'
    },
    {
      id: 5,
      description: 'Find and fix the bug in the CSS that causes the text to not appear centered.',
      code: `
        .text-center {
          text-align: left; /* Bug: should be center */
        }
      `,
      solution: 'Change "text-align: left" to "text-align: center".'
    }
  ];
  
  module.exports = questions;
  