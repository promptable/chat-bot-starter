import React, { useEffect } from 'react';

const ExampleComponent = () => {
  useEffect(() => {
    console.log('ExampleComponent mounted');
  }, [dog]);

  return (
    <div>
      This is an ExampleComponent.
    </div>
  );
}

export default ExampleComponent;
