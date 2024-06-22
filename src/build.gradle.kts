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


plugins {
    `java-library`
}

repositories {
    mavenCentral()
}

buildscript {
    dependencies {
        classpath(libs.edc.build.plugin)
    }
}

val edcVersion = libs.versions.edc

val version: String by project


val downloadArtifact: Configuration by configurations.creating {
    isTransitive = false
}

dependencies {
    downloadArtifact("org.eclipse.edc:identity-hub-cli:${version}:all")
    downloadArtifact("org.eclipse.edc:registration-service-cli:${version}:all")
}


val getJarsForLocalTest by tasks.registering(Copy::class) {
    outputs.upToDateWhen { false } //always download

    from(downloadArtifact)
        // strip away the version string
        .rename { s ->
            s.replace("-${version}", "")
                .replace("-${version}", "")
                .replace("-all", "")
        }
    into(layout.projectDirectory.dir("cli-tools"))
}

tasks {
    jar {
        finalizedBy(getJarsForLocalTest)
    }
}

allprojects {
    apply(plugin = "$group.edc-build")

    // configure which version of the annotation processor to use. defaults to the same version as the plugin
    configure<org.eclipse.edc.plugins.autodoc.AutodocExtension> {
        processorVersion.set(edcVersion)
        outputDirectory.set(project.layout.buildDirectory.asFile.get())
    }

    configure<org.eclipse.edc.plugins.edcbuild.extensions.BuildExtension> {
        publish.set(false)
    }

    configure<CheckstyleExtension> {
        configFile = rootProject.file("resources/edc-checkstyle-config.xml")
        configDirectory.set(rootProject.file("resources"))
    }

    // EdcRuntimeExtension uses this to determine the runtime classpath of the module to run.
    tasks.register("printClasspath") {
        doLast {
            println(sourceSets["main"].runtimeClasspath.asPath)
        }
    }

    tasks.test {
        testLogging {
            showStandardStreams = true
        }
    }

}


