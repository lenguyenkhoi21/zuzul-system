package com.zuzul.zuzulcommunityservice.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;

@Configuration
public class CassandraConfiguration extends AbstractCassandraConfiguration {

    /*
     * Provide a contact point to the configuration.
     */
    public String getContactPoints() {
        return "localhost";
    }

    /*
     * Provide a keyspace name to the configuration.
     */
    public String getKeyspaceName() {
        return "mykeyspace";
    }
}
