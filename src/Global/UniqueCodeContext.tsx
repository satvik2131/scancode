import React, {createContext, useState, useContext, ReactNode} from 'react';

interface UniqueCodeContextType {
  uniqueCode: string | null;
  setUniqueCode: (code: string) => void;
}

const UniqueCodeContext = createContext<UniqueCodeContextType | undefined>(
  undefined,
);

export const useUniqueCode = (): UniqueCodeContextType => {
  const context = useContext(UniqueCodeContext);
  if (!context) {
    throw new Error('useUniqueCode must be used within a UniqueCodeProvider');
  }
  return context;
};

export const UniqueCodeProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);

  return (
    <UniqueCodeContext.Provider value={{uniqueCode, setUniqueCode}}>
      {children}
    </UniqueCodeContext.Provider>
  );
};
