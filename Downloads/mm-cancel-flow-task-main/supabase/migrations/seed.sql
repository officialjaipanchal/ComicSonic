-- Seed data for subscription cancellation flow
-- This file contains sample data for testing and development

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert sample users
INSERT INTO users (id, email, created_at) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'john.doe@example.com', '2024-01-01 10:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440002', 'jane.smith@example.com', '2024-01-02 11:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440003', 'bob.wilson@example.com', '2024-01-03 12:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440004', 'alice.johnson@example.com', '2024-01-04 13:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440005', 'charlie.brown@example.com', '2024-01-05 14:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insert sample subscriptions
INSERT INTO subscriptions (id, user_id, monthly_price, status, created_at) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 2999, 'active', '2024-01-01 10:00:00+00'),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 2999, 'active', '2024-01-02 11:00:00+00'),
  ('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 2999, 'pending_cancellation', '2024-01-03 12:00:00+00'),
  ('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 2999, 'cancelled', '2024-01-04 13:00:00+00'),
  ('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 2999, 'active', '2024-01-05 14:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insert sample cancellations
INSERT INTO cancellations (id, user_id, subscription_id, downsell_variant, reason, accepted_downsell, created_at) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'A', 'Too expensive for my current situation', false, '2024-01-15 15:00:00+00'),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'B', 'Found a job and no longer need the service', true, '2024-01-16 16:00:00+00')
ON CONFLICT (user_id, subscription_id) DO NOTHING;

-- Insert sample user interactions
INSERT INTO user_interactions (id, user_id, interaction_type, interaction_value, page, timestamp) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'page_view', 'cancel_flow_start', '/cancel', '2024-01-10 10:00:00+00'),
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'button_click', 'start_cancellation', '/cancel/flow', '2024-01-11 11:00:00+00'),
  ('880e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'form_submit', 'cancellation_reason', '/cancel/flow/step2', '2024-01-12 12:00:00+00'),
  ('880e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'button_click', 'accept_downsell', '/cancel/flow/step3', '2024-01-13 13:00:00+00'),
  ('880e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'page_view', 'completion_page', '/cancel/flow/completion', '2024-01-14 14:00:00+00')
ON CONFLICT (id) DO NOTHING;
