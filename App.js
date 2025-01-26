import Board from "./componenets/Board";
import Toolbar from "./componenets/ToolBar";
import { Toolbox } from "./componenets/ToolBox";
import BoardProvider from "./store/board-provider";
import ToolBoxprovider from "./store/ToolBox-provider";

function App() {
  return (
    <BoardProvider>
      <ToolBoxprovider>
        <Toolbar />
        <Board />
        <Toolbox />
      </ToolBoxprovider>
    </BoardProvider>
  );
}

export default App;
