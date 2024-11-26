#!/bin/bash

# Usage: ./create-kafka-topics.sh <topic_name> <partitions> <replication_factor>


# Set variables
TOPIC_NAME="flask-server-events"
PARTITIONS=1
REPLICATION_FACTOR=1
BOOTSTRAP_SERVER="localhost:9092" # Modify if using a different Kafka address

# Create topic
echo "Creating topic $TOPIC_NAME with $PARTITIONS partitions and $REPLICATION_FACTOR replication factor..."
kafka-topics --bootstrap-server "$BOOTSTRAP_SERVER" \
             --create \
             --topic "$TOPIC_NAME" \
             --partitions "$PARTITIONS" \
             --replication-factor "$REPLICATION_FACTOR"

# Verify if topic was created successfully
if [ $? -eq 0 ]; then
  echo "Topic $TOPIC_NAME created successfully!"
else
  echo "Failed to create topic $TOPIC_NAME."
fi

TOPIC_NAME="nodejs-server-events"
# Create topic
echo "Creating topic $TOPIC_NAME with $PARTITIONS partitions and $REPLICATION_FACTOR replication factor..."
kafka-topics --bootstrap-server "$BOOTSTRAP_SERVER" \
             --create \
             --topic "$TOPIC_NAME" \
             --partitions "$PARTITIONS" \
             --replication-factor "$REPLICATION_FACTOR"

# Verify if topic was created successfully
if [ $? -eq 0 ]; then
  echo "Topic $TOPIC_NAME created successfully!"
else
  echo "Failed to create topic $TOPIC_NAME."
fi
