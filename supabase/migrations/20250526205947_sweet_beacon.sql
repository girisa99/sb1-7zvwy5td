-- Check if category exists before inserting
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM rag_categories WHERE slug = 'genie-docs'
  ) THEN
    INSERT INTO rag_categories (name, slug, description)
    VALUES (
      'Genie Documentation',
      'genie-docs',
      'Comprehensive documentation and guides for using the Genie AI Assistant'
    );
  END IF;
END $$;

-- Insert or update main user guide content
DO $$
DECLARE
  v_category_id uuid;
BEGIN
  -- Get the category ID
  SELECT id INTO v_category_id FROM rag_categories WHERE slug = 'genie-docs';

  -- Insert or update the content
  INSERT INTO rag_content (
    title,
    slug,
    summary,
    response,
    query,
    context,
    status,
    category_id,
    tags,
    published_at
  )
  VALUES (
    'Complete Guide to Using Genie AI Assistant',
    'genie-user-guide',
    'A comprehensive guide to using Genie, the AI assistant for personalized medicine and healthcare insights',
    '# Genie AI Assistant User Guide

## Introduction

Genie is an advanced AI assistant designed specifically for personalized medicine and healthcare insights. This guide covers everything you need to know about using Genie effectively.

## Getting Started

### First-Time Setup

1. Click the Genie icon in the bottom-right corner
2. Complete the one-time registration with:
   - First and last name
   - Email address
   - Newsletter preferences (optional)
3. Accept the terms of service

### Returning Users

- Genie remembers you and greets you by name
- Option to continue previous conversations or start new ones
- Previous preferences and settings are preserved

## Core Features

### Interaction Modes

1. **System Default Mode**
   - Uses multiple AI models for comprehensive responses
   - Best for general healthcare queries
   - Balanced between speed and accuracy

2. **Single Model Mode**
   - Choose one specific AI model
   - Faster responses
   - Good for straightforward questions

3. **Multi-Model Mode**
   - Compare responses from different AI models
   - Side-by-side view of multiple perspectives
   - Ideal for complex queries

4. **Medical Mode**
   - Enhanced with medical database access
   - Includes FDA data, clinical trials, and research
   - Best for specific medical queries

5. **Publication Mode**
   - Generates content for review and publication
   - Includes citations and references
   - Suitable for research and documentation

### Key Capabilities

1. **Medical Information Retrieval**
   - Access to FDA database
   - Clinical trial information
   - Drug information and interactions
   - Treatment guidelines

2. **Personalized Responses**
   - Contextual conversation memory
   - User preference adaptation
   - History-aware interactions

3. **Data Integration**
   - Real-time FDA updates
   - Clinical trial database access
   - Medical research integration
   - Healthcare provider information

4. **Content Generation**
   - Medical content creation
   - Research summaries
   - Patient education materials
   - Healthcare documentation

## Advanced Features

### RAG (Retrieval-Augmented Generation)
- Enhanced responses using verified medical sources
- Real-time fact-checking
- Source citations and references
- Quality-controlled information

### Conversation Management
- Save and resume conversations
- Export conversation history
- Topic categorization
- Context-aware responses

### Security and Privacy
- End-to-end encryption
- HIPAA-compliant data handling
- Secure data storage
- Privacy-first design

## Best Practices

1. **Asking Questions**
   - Be specific in your queries
   - Provide relevant context
   - Specify the type of information needed
   - Use medical terminology when appropriate

2. **Using Different Modes**
   - System Default: General queries
   - Single Model: Quick answers
   - Multi-Model: Complex questions
   - Medical Mode: Clinical information
   - Publication Mode: Content creation

3. **Managing Conversations**
   - Start new conversations for different topics
   - Use clear and concise language
   - Review and verify important information
   - Save relevant conversations

## Troubleshooting

Common issues and solutions:
1. Connection Issues
   - Check internet connectivity
   - Refresh the page
   - Clear browser cache

2. Registration Problems
   - Verify email format
   - Check password requirements
   - Contact support if persistent

3. Response Delays
   - Consider switching to single model mode
   - Check internet speed
   - Reduce query complexity

## Support and Resources

- Email Support: geniecellgene@gmail.com
- Documentation Updates: Regular content updates
- Feature Requests: Submit through the feedback form
- Bug Reports: Use the support portal

## Updates and Maintenance

- Regular feature updates
- Security patches
- Content database updates
- Performance improvements

## Conclusion

Genie is continuously evolving to provide better healthcare insights and support. Stay updated with our newsletter for the latest features and improvements.',
    'How to use Genie AI Assistant',
    '{"type": "documentation", "version": "1.0"}',
    'approved',
    v_category_id,
    ARRAY['Genie', 'AI Assistant', 'User Guide', 'Documentation', 'Healthcare'],
    NOW()
  )
  ON CONFLICT (slug)
  DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    response = EXCLUDED.response,
    query = EXCLUDED.query,
    context = EXCLUDED.context,
    status = EXCLUDED.status,
    category_id = EXCLUDED.category_id,
    tags = EXCLUDED.tags,
    updated_at = NOW();
END $$;