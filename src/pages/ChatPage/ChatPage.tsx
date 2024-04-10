import {
  QuickBloxUIKitDesktopLayout,
  QuickBloxUIKitProvider,
} from 'quickblox-react-ui-kit';
import { QBConfig } from '../../QBconfig';
import { useUnit } from 'effector-react';
import * as model from './model';
import CustomTheme from './CustomTheme.ts';

const ChatPage = () => {
  const isConnected = useUnit(model.$isConnected);

  return (
    <div className="w-screen flex flex-col justify-between">
      <QuickBloxUIKitProvider
        qbConfig={{ ...QBConfig }}
        maxFileSize={100 * 1000000}
        accountData={{ ...QBConfig.credentials }}
      >
        <div className="absolute top-[90px] w-full">
          {
            // React states indicating the ability to render UI
            isConnected ? (
              <QuickBloxUIKitDesktopLayout
                uikitHeightOffset={`155px`}
                theme={new CustomTheme()}
              />
            ) : (
              <div className="text-center mt-10">initializing chat...</div>
            )
          }
        </div>
        <div className="h-[155px]"></div>
      </QuickBloxUIKitProvider>
    </div>
  );
};

export default ChatPage;
