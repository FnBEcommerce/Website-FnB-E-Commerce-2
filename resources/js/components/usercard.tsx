import { User, Mail, Send } from "lucide-react"

interface UserCardProps {
  user: {
    name: string
    email: string
  } | undefined
  chatId: number
  languageCode: string
  sendType: string
  onSend: () => void
}

export function UserCard({ user, chatId, languageCode, sendType, onSend }: UserCardProps) {
  const getButtonText = (type: string) => {
    switch (type) {
      case 'prepare':
        return 'Send Prepare'
      case 'middle':
        return 'Send Middle'
      case 'done':
        return 'Send Done'
      default:
        return 'Send'
    }
  }

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'prepare':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Prepare' }
      case 'middle':
        return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'In Transit' }
      case 'done':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Delivered' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Unknown' }
    }
  }

  const status = getStatusBadge(sendType)

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-border overflow-hidden group">
      <div className="p-6 space-y-4">
        {/* User Info */}
        {user ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6900] to-[#FA2C36] flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-gray-900 truncate mb-1">{user.name}</h3>
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <p className="truncate">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">User not found</p>
          </div>
        )}

        {/* Details */}
        <div className="flex flex-wrap gap-2">
          <div className={`px-3 py-1 rounded-full ${status.bg} ${status.text}`}>
            {status.label}
          </div>
          <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {languageCode.toUpperCase()}
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={onSend}
          className="w-full bg-gradient-to-r from-[#FF6900] to-[#FA2C36] text-white rounded-lg py-3 px-4 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          {getButtonText(sendType)}
        </button>
      </div>
    </div>
  )
}
