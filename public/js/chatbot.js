// ===== CHATBOT =====
// Handles the chatbot interface for asking questions about the document

const Chatbot = {
    documentText: '',
    conversationHistory: [],
    isEnabled: false,
    
    /**
     * Initialize chatbot
     */
    init() {
        const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('chat-send-btn');
        
        // Send button click
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Enter key to send
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        console.log('✅ Chatbot initialized');
    },
    
    /**
     * Enable chatbot after summary is generated
     * @param {string} documentText - The original document text
     */
    enable(documentText) {
        this.documentText = documentText;
        this.isEnabled = true;
        this.conversationHistory = [];
        
        // Enable input and button
        document.getElementById('chat-input').disabled = false;
        document.getElementById('chat-send-btn').disabled = false;
        
        // Clear empty message
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '';
        
        // Add welcome message
        this.addMessage('assistant', '👋 Hi! I\'ve analyzed the document. Ask me anything about it!');
        
        console.log('✅ Chatbot enabled');
    },
    
    /**
     * Disable chatbot
     */
    disable() {
        this.isEnabled = false;
        this.documentText = '';
        this.conversationHistory = [];
        
        document.getElementById('chat-input').disabled = true;
        document.getElementById('chat-send-btn').disabled = true;
        document.getElementById('chat-input').value = '';
        
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '<div class="chat-message empty"><p>Generate a summary first, then ask questions about your document here.</p></div>';
    },
    
    /**
     * Send a message
     */
    async sendMessage() {
        if (!this.isEnabled) return;
        
        const chatInput = document.getElementById('chat-input');
        const question = chatInput.value.trim();
        
        if (!question) return;
        
        // Add user message to UI
        this.addMessage('user', question);
        chatInput.value = '';
        
        // Add to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: question
        });
        
        // Disable input while processing
        const sendBtn = document.getElementById('chat-send-btn');
        chatInput.disabled = true;
        sendBtn.disabled = true;
        sendBtn.textContent = 'Thinking...';
        
        try {
            // Get answer from AI
            const answer = await answerQuestion(
                this.documentText,
                this.conversationHistory,
                question
            );
            
            // Add assistant message to UI
            this.addMessage('assistant', answer);
            
            // Add to conversation history
            this.conversationHistory.push({
                role: 'assistant',
                content: answer
            });
            
        } catch (error) {
            console.error('❌ Chatbot error:', error);
            this.addMessage('assistant', '❌ Sorry, I encountered an error. Please try again.');
        } finally {
            // Re-enable input
            chatInput.disabled = false;
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send';
            chatInput.focus();
        }
    },
    
    /**
     * Add a message to the chat UI
     * @param {string} role - 'user' or 'assistant'
     * @param {string} content - Message content
     */
    addMessage(role, content) {
        const messagesContainer = document.getElementById('chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;
        
        // Render markdown for assistant messages
        if (role === 'assistant' && typeof marked !== 'undefined') {
            messageDiv.innerHTML = marked.parse(content);
        } else {
            messageDiv.textContent = content;
        }
        
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};
