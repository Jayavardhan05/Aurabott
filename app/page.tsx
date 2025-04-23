import CollegeHeader from "@/components/college-header"
import Navigation from "@/components/navigation"
import ChatbotSection from "@/components/chatbot-section"
import CampusNavigation from "@/components/campus-navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CollegeHeader />
      <Navigation />
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ChatbotSection />
          </div>
          <div className="md:col-span-1">
            <CampusNavigation />
          </div>
        </div>
      </main>
      <footer className="bg-sky-600 text-white p-4 text-center">
        <p>© {new Date().getFullYear()} Vignan's Institute of Information Technology. All rights reserved.</p>
      </footer>
    </div>
  )
}

