import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Sidebar from './components/layouts/Sidebar';
import MultiStepForm from './components/layouts/MultiStepForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 min-h-[calc(100vh-64px-40px)]">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <MultiStepForm />
        </main>
      </div>
      <Footer />
    </div>
  );
}


export default App;
