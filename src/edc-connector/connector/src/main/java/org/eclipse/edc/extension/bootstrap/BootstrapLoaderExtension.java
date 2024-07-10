/*
 *  Copyright (c) 2021 Microsoft Corporation
 *
 *  This program and the accompanying materials are made available under the
 *  terms of the Apache License, Version 2.0 which is available at
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Contributors:
 *       Microsoft Corporation - Initial implementation
 *
 */

package org.eclipse.edc.extension.bootstrap;

import org.eclipse.edc.connector.controlplane.asset.spi.domain.Asset;
import org.eclipse.edc.connector.controlplane.asset.spi.index.AssetIndex;
import org.eclipse.edc.connector.controlplane.contract.spi.offer.store.ContractDefinitionStore;
import org.eclipse.edc.connector.controlplane.contract.spi.types.offer.ContractDefinition;
import org.eclipse.edc.connector.controlplane.policy.spi.PolicyDefinition;
import org.eclipse.edc.connector.controlplane.policy.spi.store.PolicyDefinitionStore;
import org.eclipse.edc.policy.model.Policy;
import org.eclipse.edc.runtime.metamodel.annotation.Inject;
import org.eclipse.edc.spi.system.ServiceExtension;
import org.eclipse.edc.spi.system.ServiceExtensionContext;
import org.eclipse.edc.spi.types.domain.DataAddress;

import java.util.HashMap;
import java.util.Map;

import static org.eclipse.edc.spi.query.Criterion.criterion;

public class BootstrapLoaderExtension implements ServiceExtension {
    @Inject
    private AssetIndex assetIndex;
    @Inject
    private PolicyDefinitionStore policyDefinitionStore;
    @Inject
    private ContractDefinitionStore contractDefinitionStore;

    @Override
    public String name() {
        return "Bootstrap Loader";
    }

    @Override
    public void initialize(ServiceExtensionContext context) {
        var policy = createPolicy();
        policyDefinitionStore.create(policy);

        //registerDataEntries();
        //registerContractDefinition(policy.getId());
    }

    public void registerDataEntries() {
        Map<String, Object> dataAddressProperties = new HashMap<>();
        dataAddressProperties.put("baseUrl", "URL");
        dataAddressProperties.put("method", "GET");
        var dataAddress = DataAddress.Builder.newInstance()
                .type("HttpData")
                .property("name", "test.txt")
                .property("proxyPath", "true")
                .properties(dataAddressProperties)
                .build();
        Map<String, Object> assetProperties = new HashMap<>();
        assetProperties.put("name", "test.txt");
        assetProperties.put("description", "A default asset");
        assetProperties.put("contenttype", "text/plain");
        assetProperties.put("date", "2024-01-01");
        assetProperties.put("size", "200 Bytes");
        assetProperties.put("author", "Daniel Kurtz");

        var asset = Asset.Builder.newInstance()
                .id("default-asset")
                .dataAddress(dataAddress)
                .properties(assetProperties)
                .build();
        assetIndex.create(asset);
    }

    public void registerContractDefinition(String policyId) {
        var contractDefinition = ContractDefinition.Builder.newInstance()
                .id("1")
                .accessPolicyId(policyId)
                .contractPolicyId(policyId)
                .assetsSelectorCriterion(criterion(Asset.PROPERTY_ID, "=", "default-asset"))
                .build();

        contractDefinitionStore.save(contractDefinition);
    }

    private PolicyDefinition createPolicy() {
        Policy policy = Policy.Builder.newInstance()
                .build();

        PolicyDefinition definition = PolicyDefinition.Builder.newInstance()
                .policy(policy)
                .privateProperty("name", "Default policy")
                .privateProperty("description", "This policy allows every access.")
                .build();

        return definition;
    }
}