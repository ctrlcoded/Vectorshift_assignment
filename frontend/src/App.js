import { Topbar } from './Topbar';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { StatusBar } from './StatusBar';

function App() {
  return (
    <div className="app-container">
      <Topbar />
      <div className="main-content">
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
