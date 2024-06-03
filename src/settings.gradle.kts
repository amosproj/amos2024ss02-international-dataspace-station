/*
 *  Copyright (c) 2022 Fraunhofer Institute for Software and Systems Engineering
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

rootProject.name = "samples"

pluginManagement {
    repositories {
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositories {
        mavenCentral()
        mavenLocal()
    }
}

include(":connector")


//policy
include(":policy:policy-01-policy-enforcement:policy-enforcement-company")
include(":policy:policy-01-policy-enforcement:policy-enforcement-tax_provider")
include(":policy:policy-01-policy-enforcement:policy-enforcement-bank")
include(":policy:policy-01-policy-enforcement:policy-functions")

include(":util:http-request-logger")

include(":system-tests")
