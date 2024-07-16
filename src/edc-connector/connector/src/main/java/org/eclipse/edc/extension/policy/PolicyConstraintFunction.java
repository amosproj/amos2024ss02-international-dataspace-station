/*
 *  Copyright (c) 2024 Fraunhofer Institute for Software and Systems Engineering
 *
 *  This program and the accompanying materials are made available under the
 *  terms of the Apache License, Version 2.0 which is available at
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 *  SPDX-License-Identifier: Apache-2.0
 *
 *  Contributors:
 *       Fraunhofer Institute for Software and Systems Engineering - initial API and implementation
 *
 */

package org.eclipse.edc.extension.policy;

import org.eclipse.edc.policy.engine.spi.AtomicConstraintFunction;
import org.eclipse.edc.policy.engine.spi.PolicyContext;
import org.eclipse.edc.policy.model.Operator;
import org.eclipse.edc.policy.model.Permission;
import org.eclipse.edc.spi.agent.ParticipantAgent;
import org.eclipse.edc.spi.monitor.Monitor;

import java.util.Objects;

import static java.lang.String.format;

public class PolicyConstraintFunction implements AtomicConstraintFunction<Permission> {
    
    private final Monitor monitor;
    
    public PolicyConstraintFunction(Monitor monitor) {
        this.monitor = monitor;
    }
    
    @Override
    public boolean evaluate(Operator operator, Object rightValue, Permission rule, PolicyContext context) {
        var role = context.getContextData(ParticipantAgent.class).getClaims().get("client_id");
        
        monitor.info(format("Evaluating constraint: role %s %s", operator, rightValue.toString()));
        
        return switch (operator) {
            case EQ -> Objects.equals(role, rightValue);
            case NEQ -> !Objects.equals(role, rightValue);
            default -> false;
        };
    }
}