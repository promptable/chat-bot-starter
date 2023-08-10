import React, { useEffect } from 'react';

const ExampleComponent = () => {
  let dog = 1
  useEffect(() => {
    console.log('ExampleComponent mounted');
  }, []);

  return (
    <div>
      This is an ExampleComponent.
    </div>
  );
}

export default ExampleComponent;
