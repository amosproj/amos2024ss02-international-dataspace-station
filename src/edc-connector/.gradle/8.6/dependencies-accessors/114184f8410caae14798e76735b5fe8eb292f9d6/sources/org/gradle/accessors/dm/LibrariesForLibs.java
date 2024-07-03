package org.gradle.accessors.dm;

import org.gradle.api.NonNullApi;
import org.gradle.api.artifacts.MinimalExternalModuleDependency;
import org.gradle.plugin.use.PluginDependency;
import org.gradle.api.artifacts.ExternalModuleDependencyBundle;
import org.gradle.api.artifacts.MutableVersionConstraint;
import org.gradle.api.provider.Provider;
import org.gradle.api.model.ObjectFactory;
import org.gradle.api.provider.ProviderFactory;
import org.gradle.api.internal.catalog.AbstractExternalDependencyFactory;
import org.gradle.api.internal.catalog.DefaultVersionCatalog;
import java.util.Map;
import org.gradle.api.internal.attributes.ImmutableAttributesFactory;
import org.gradle.api.internal.artifacts.dsl.CapabilityNotationParser;
import javax.inject.Inject;

/**
 * A catalog of dependencies accessible via the {@code libs} extension.
 */
@NonNullApi
public class LibrariesForLibs extends AbstractExternalDependencyFactory {

    private final AbstractExternalDependencyFactory owner = this;
    private final EdcLibraryAccessors laccForEdcLibraryAccessors = new EdcLibraryAccessors(owner);
    private final JakartaLibraryAccessors laccForJakartaLibraryAccessors = new JakartaLibraryAccessors(owner);
    private final JunitLibraryAccessors laccForJunitLibraryAccessors = new JunitLibraryAccessors(owner);
    private final KafkaLibraryAccessors laccForKafkaLibraryAccessors = new KafkaLibraryAccessors(owner);
    private final OkhttpLibraryAccessors laccForOkhttpLibraryAccessors = new OkhttpLibraryAccessors(owner);
    private final OpentelemetryLibraryAccessors laccForOpentelemetryLibraryAccessors = new OpentelemetryLibraryAccessors(owner);
    private final TestcontainersLibraryAccessors laccForTestcontainersLibraryAccessors = new TestcontainersLibraryAccessors(owner);
    private final VersionAccessors vaccForVersionAccessors = new VersionAccessors(providers, config);
    private final BundleAccessors baccForBundleAccessors = new BundleAccessors(objects, providers, config, attributesFactory, capabilityNotationParser);
    private final PluginAccessors paccForPluginAccessors = new PluginAccessors(providers, config);

    @Inject
    public LibrariesForLibs(DefaultVersionCatalog config, ProviderFactory providers, ObjectFactory objects, ImmutableAttributesFactory attributesFactory, CapabilityNotationParser capabilityNotationParser) {
        super(config, providers, objects, attributesFactory, capabilityNotationParser);
    }

    /**
     * Dependency provider for <b>assertj</b> with <b>org.assertj:assertj-core</b> coordinates and
     * with version reference <b>assertj</b>
     * <p>
     * This dependency was declared in catalog libs.versions.toml
     */
    public Provider<MinimalExternalModuleDependency> getAssertj() {
        return create("assertj");
    }

    /**
     * Dependency provider for <b>awaitility</b> with <b>org.awaitility:awaitility</b> coordinates and
     * with version reference <b>awaitility</b>
     * <p>
     * This dependency was declared in catalog libs.versions.toml
     */
    public Provider<MinimalExternalModuleDependency> getAwaitility() {
        return create("awaitility");
    }

    /**
     * Dependency provider for <b>jakartaJson</b> with <b>org.glassfish:jakarta.json</b> coordinates and
     * with version reference <b>jakarta.json</b>
     * <p>
     * This dependency was declared in catalog libs.versions.toml
     */
    public Provider<MinimalExternalModuleDependency> getJakartaJson() {
        return create("jakartaJson");
    }

    /**
     * Dependency provider for <b>restAssured</b> with <b>io.rest-assured:rest-assured</b> coordinates and
     * with version reference <b>restAssured</b>
     * <p>
     * This dependency was declared in catalog libs.versions.toml
     */
    public Provider<MinimalExternalModuleDependency> getRestAssured() {
        return create("restAssured");
    }

    /**
     * Group of libraries at <b>edc</b>
     */
    public EdcLibraryAccessors getEdc() {
        return laccForEdcLibraryAccessors;
    }

    /**
     * Group of libraries at <b>jakarta</b>
     */
    public JakartaLibraryAccessors getJakarta() {
        return laccForJakartaLibraryAccessors;
    }

    /**
     * Group of libraries at <b>junit</b>
     */
    public JunitLibraryAccessors getJunit() {
        return laccForJunitLibraryAccessors;
    }

    /**
     * Group of libraries at <b>kafka</b>
     */
    public KafkaLibraryAccessors getKafka() {
        return laccForKafkaLibraryAccessors;
    }

    /**
     * Group of libraries at <b>okhttp</b>
     */
    public OkhttpLibraryAccessors getOkhttp() {
        return laccForOkhttpLibraryAccessors;
    }

    /**
     * Group of libraries at <b>opentelemetry</b>
     */
    public OpentelemetryLibraryAccessors getOpentelemetry() {
        return laccForOpentelemetryLibraryAccessors;
    }

    /**
     * Group of libraries at <b>testcontainers</b>
     */
    public TestcontainersLibraryAccessors getTestcontainers() {
        return laccForTestcontainersLibraryAccessors;
    }

    /**
     * Group of versions at <b>versions</b>
     */
    public VersionAccessors getVersions() {
        return vaccForVersionAccessors;
    }

    /**
     * Group of bundles at <b>bundles</b>
     */
    public BundleAccessors getBundles() {
        return baccForBundleAccessors;
    }

    /**
     * Group of plugins at <b>plugins</b>
     */
    public PluginAccessors getPlugins() {
        return paccForPluginAccessors;
    }

    public static class EdcLibraryAccessors extends SubDependencyFactory {
        private final EdcApiLibraryAccessors laccForEdcApiLibraryAccessors = new EdcApiLibraryAccessors(owner);
        private final EdcAuthLibraryAccessors laccForEdcAuthLibraryAccessors = new EdcAuthLibraryAccessors(owner);
        private final EdcBuildLibraryAccessors laccForEdcBuildLibraryAccessors = new EdcBuildLibraryAccessors(owner);
        private final EdcConfigurationLibraryAccessors laccForEdcConfigurationLibraryAccessors = new EdcConfigurationLibraryAccessors(owner);
        private final EdcConnectorLibraryAccessors laccForEdcConnectorLibraryAccessors = new EdcConnectorLibraryAccessors(owner);
        private final EdcControlLibraryAccessors laccForEdcControlLibraryAccessors = new EdcControlLibraryAccessors(owner);
        private final EdcDataLibraryAccessors laccForEdcDataLibraryAccessors = new EdcDataLibraryAccessors(owner);
        private final EdcIamLibraryAccessors laccForEdcIamLibraryAccessors = new EdcIamLibraryAccessors(owner);
        private final EdcJerseyLibraryAccessors laccForEdcJerseyLibraryAccessors = new EdcJerseyLibraryAccessors(owner);
        private final EdcJettyLibraryAccessors laccForEdcJettyLibraryAccessors = new EdcJettyLibraryAccessors(owner);
        private final EdcJsonLibraryAccessors laccForEdcJsonLibraryAccessors = new EdcJsonLibraryAccessors(owner);
        private final EdcManagementLibraryAccessors laccForEdcManagementLibraryAccessors = new EdcManagementLibraryAccessors(owner);
        private final EdcMicrometerLibraryAccessors laccForEdcMicrometerLibraryAccessors = new EdcMicrometerLibraryAccessors(owner);
        private final EdcMonitorLibraryAccessors laccForEdcMonitorLibraryAccessors = new EdcMonitorLibraryAccessors(owner);
        private final EdcProvisionLibraryAccessors laccForEdcProvisionLibraryAccessors = new EdcProvisionLibraryAccessors(owner);
        private final EdcRuntimeLibraryAccessors laccForEdcRuntimeLibraryAccessors = new EdcRuntimeLibraryAccessors(owner);
        private final EdcTransferLibraryAccessors laccForEdcTransferLibraryAccessors = new EdcTransferLibraryAccessors(owner);
        private final EdcVaultLibraryAccessors laccForEdcVaultLibraryAccessors = new EdcVaultLibraryAccessors(owner);

        public EdcLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>boot</b> with <b>org.eclipse.edc:boot</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getBoot() {
            return create("edc.boot");
        }

        /**
         * Dependency provider for <b>dsp</b> with <b>org.eclipse.edc:dsp</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getDsp() {
            return create("edc.dsp");
        }

        /**
         * Dependency provider for <b>http</b> with <b>org.eclipse.edc:http</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getHttp() {
            return create("edc.http");
        }

        /**
         * Dependency provider for <b>junit</b> with <b>org.eclipse.edc:junit</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getJunit() {
            return create("edc.junit");
        }

        /**
         * Dependency provider for <b>util</b> with <b>org.eclipse.edc:util</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getUtil() {
            return create("edc.util");
        }

        /**
         * Group of libraries at <b>edc.api</b>
         */
        public EdcApiLibraryAccessors getApi() {
            return laccForEdcApiLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.auth</b>
         */
        public EdcAuthLibraryAccessors getAuth() {
            return laccForEdcAuthLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.build</b>
         */
        public EdcBuildLibraryAccessors getBuild() {
            return laccForEdcBuildLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.configuration</b>
         */
        public EdcConfigurationLibraryAccessors getConfiguration() {
            return laccForEdcConfigurationLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.connector</b>
         */
        public EdcConnectorLibraryAccessors getConnector() {
            return laccForEdcConnectorLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.control</b>
         */
        public EdcControlLibraryAccessors getControl() {
            return laccForEdcControlLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.data</b>
         */
        public EdcDataLibraryAccessors getData() {
            return laccForEdcDataLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.iam</b>
         */
        public EdcIamLibraryAccessors getIam() {
            return laccForEdcIamLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.jersey</b>
         */
        public EdcJerseyLibraryAccessors getJersey() {
            return laccForEdcJerseyLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.jetty</b>
         */
        public EdcJettyLibraryAccessors getJetty() {
            return laccForEdcJettyLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.json</b>
         */
        public EdcJsonLibraryAccessors getJson() {
            return laccForEdcJsonLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.management</b>
         */
        public EdcManagementLibraryAccessors getManagement() {
            return laccForEdcManagementLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.micrometer</b>
         */
        public EdcMicrometerLibraryAccessors getMicrometer() {
            return laccForEdcMicrometerLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.monitor</b>
         */
        public EdcMonitorLibraryAccessors getMonitor() {
            return laccForEdcMonitorLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.provision</b>
         */
        public EdcProvisionLibraryAccessors getProvision() {
            return laccForEdcProvisionLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.runtime</b>
         */
        public EdcRuntimeLibraryAccessors getRuntime() {
            return laccForEdcRuntimeLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.transfer</b>
         */
        public EdcTransferLibraryAccessors getTransfer() {
            return laccForEdcTransferLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.vault</b>
         */
        public EdcVaultLibraryAccessors getVault() {
            return laccForEdcVaultLibraryAccessors;
        }

    }

    public static class EdcApiLibraryAccessors extends SubDependencyFactory {

        public EdcApiLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>core</b> with <b>org.eclipse.edc:api-core</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCore() {
            return create("edc.api.core");
        }

        /**
         * Dependency provider for <b>observability</b> with <b>org.eclipse.edc:api-observability</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getObservability() {
            return create("edc.api.observability");
        }

    }

    public static class EdcAuthLibraryAccessors extends SubDependencyFactory {

        public EdcAuthLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>tokenbased</b> with <b>org.eclipse.edc:auth-tokenbased</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getTokenbased() {
            return create("edc.auth.tokenbased");
        }

    }

    public static class EdcBuildLibraryAccessors extends SubDependencyFactory {

        public EdcBuildLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>plugin</b> with <b>org.eclipse.edc.edc-build:org.eclipse.edc.edc-build.gradle.plugin</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getPlugin() {
            return create("edc.build.plugin");
        }

    }

    public static class EdcConfigurationLibraryAccessors extends SubDependencyFactory {

        public EdcConfigurationLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>filesystem</b> with <b>org.eclipse.edc:configuration-filesystem</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getFilesystem() {
            return create("edc.configuration.filesystem");
        }

    }

    public static class EdcConnectorLibraryAccessors extends SubDependencyFactory {

        public EdcConnectorLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>core</b> with <b>org.eclipse.edc:connector-core</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCore() {
            return create("edc.connector.core");
        }

    }

    public static class EdcControlLibraryAccessors extends SubDependencyFactory {
        private final EdcControlPlaneLibraryAccessors laccForEdcControlPlaneLibraryAccessors = new EdcControlPlaneLibraryAccessors(owner);

        public EdcControlLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.control.plane</b>
         */
        public EdcControlPlaneLibraryAccessors getPlane() {
            return laccForEdcControlPlaneLibraryAccessors;
        }

    }

    public static class EdcControlPlaneLibraryAccessors extends SubDependencyFactory {
        private final EdcControlPlaneApiLibraryAccessors laccForEdcControlPlaneApiLibraryAccessors = new EdcControlPlaneApiLibraryAccessors(owner);

        public EdcControlPlaneLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>core</b> with <b>org.eclipse.edc:control-plane-core</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCore() {
            return create("edc.control.plane.core");
        }

        /**
         * Dependency provider for <b>spi</b> with <b>org.eclipse.edc:control-plane-spi</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getSpi() {
            return create("edc.control.plane.spi");
        }

        /**
         * Group of libraries at <b>edc.control.plane.api</b>
         */
        public EdcControlPlaneApiLibraryAccessors getApi() {
            return laccForEdcControlPlaneApiLibraryAccessors;
        }

    }

    public static class EdcControlPlaneApiLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public EdcControlPlaneApiLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.eclipse.edc:control-plane-api</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> asProvider() {
            return create("edc.control.plane.api");
        }

        /**
         * Dependency provider for <b>client</b> with <b>org.eclipse.edc:control-plane-api-client</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getClient() {
            return create("edc.control.plane.api.client");
        }

    }

    public static class EdcDataLibraryAccessors extends SubDependencyFactory {
        private final EdcDataPlaneLibraryAccessors laccForEdcDataPlaneLibraryAccessors = new EdcDataPlaneLibraryAccessors(owner);

        public EdcDataLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.data.plane</b>
         */
        public EdcDataPlaneLibraryAccessors getPlane() {
            return laccForEdcDataPlaneLibraryAccessors;
        }

    }

    public static class EdcDataPlaneLibraryAccessors extends SubDependencyFactory {
        private final EdcDataPlaneAwsLibraryAccessors laccForEdcDataPlaneAwsLibraryAccessors = new EdcDataPlaneAwsLibraryAccessors(owner);
        private final EdcDataPlaneAzureLibraryAccessors laccForEdcDataPlaneAzureLibraryAccessors = new EdcDataPlaneAzureLibraryAccessors(owner);
        private final EdcDataPlaneControlLibraryAccessors laccForEdcDataPlaneControlLibraryAccessors = new EdcDataPlaneControlLibraryAccessors(owner);
        private final EdcDataPlanePublicLibraryAccessors laccForEdcDataPlanePublicLibraryAccessors = new EdcDataPlanePublicLibraryAccessors(owner);
        private final EdcDataPlaneSelectorLibraryAccessors laccForEdcDataPlaneSelectorLibraryAccessors = new EdcDataPlaneSelectorLibraryAccessors(owner);

        public EdcDataPlaneLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>client</b> with <b>org.eclipse.edc:data-plane-client</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getClient() {
            return create("edc.data.plane.client");
        }

        /**
         * Dependency provider for <b>core</b> with <b>org.eclipse.edc:data-plane-core</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCore() {
            return create("edc.data.plane.core");
        }

        /**
         * Dependency provider for <b>http</b> with <b>org.eclipse.edc:data-plane-http</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getHttp() {
            return create("edc.data.plane.http");
        }

        /**
         * Dependency provider for <b>kafka</b> with <b>org.eclipse.edc:data-plane-kafka</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getKafka() {
            return create("edc.data.plane.kafka");
        }

        /**
         * Dependency provider for <b>spi</b> with <b>org.eclipse.edc:data-plane-spi</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getSpi() {
            return create("edc.data.plane.spi");
        }

        /**
         * Dependency provider for <b>util</b> with <b>org.eclipse.edc:data-plane-util</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getUtil() {
            return create("edc.data.plane.util");
        }

        /**
         * Group of libraries at <b>edc.data.plane.aws</b>
         */
        public EdcDataPlaneAwsLibraryAccessors getAws() {
            return laccForEdcDataPlaneAwsLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.data.plane.azure</b>
         */
        public EdcDataPlaneAzureLibraryAccessors getAzure() {
            return laccForEdcDataPlaneAzureLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.data.plane.control</b>
         */
        public EdcDataPlaneControlLibraryAccessors getControl() {
            return laccForEdcDataPlaneControlLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.data.plane.public</b>
         */
        public EdcDataPlanePublicLibraryAccessors getPublic() {
            return laccForEdcDataPlanePublicLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.data.plane.selector</b>
         */
        public EdcDataPlaneSelectorLibraryAccessors getSelector() {
            return laccForEdcDataPlaneSelectorLibraryAccessors;
        }

    }

    public static class EdcDataPlaneAwsLibraryAccessors extends SubDependencyFactory {

        public EdcDataPlaneAwsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>s3</b> with <b>org.eclipse.edc:data-plane-aws-s3</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getS3() {
            return create("edc.data.plane.aws.s3");
        }

    }

    public static class EdcDataPlaneAzureLibraryAccessors extends SubDependencyFactory {

        public EdcDataPlaneAzureLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>storage</b> with <b>org.eclipse.edc:data-plane-azure-storage</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getStorage() {
            return create("edc.data.plane.azure.storage");
        }

    }

    public static class EdcDataPlaneControlLibraryAccessors extends SubDependencyFactory {

        public EdcDataPlaneControlLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.eclipse.edc:data-plane-control-api</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getApi() {
            return create("edc.data.plane.control.api");
        }

    }

    public static class EdcDataPlanePublicLibraryAccessors extends SubDependencyFactory {

        public EdcDataPlanePublicLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.eclipse.edc:data-plane-public-api</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getApi() {
            return create("edc.data.plane.public.api");
        }

    }

    public static class EdcDataPlaneSelectorLibraryAccessors extends SubDependencyFactory {

        public EdcDataPlaneSelectorLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.eclipse.edc:data-plane-selector-api</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getApi() {
            return create("edc.data.plane.selector.api");
        }

        /**
         * Dependency provider for <b>core</b> with <b>org.eclipse.edc:data-plane-selector-core</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCore() {
            return create("edc.data.plane.selector.core");
        }

    }

    public static class EdcIamLibraryAccessors extends SubDependencyFactory {

        public EdcIamLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>mock</b> with <b>org.eclipse.edc:iam-mock</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getMock() {
            return create("edc.iam.mock");
        }

    }

    public static class EdcJerseyLibraryAccessors extends SubDependencyFactory {

        public EdcJerseyLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>micrometer</b> with <b>org.eclipse.edc:jersey-micrometer</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getMicrometer() {
            return create("edc.jersey.micrometer");
        }

    }

    public static class EdcJettyLibraryAccessors extends SubDependencyFactory {

        public EdcJettyLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>micrometer</b> with <b>org.eclipse.edc:jetty-micrometer</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getMicrometer() {
            return create("edc.jetty.micrometer");
        }

    }

    public static class EdcJsonLibraryAccessors extends SubDependencyFactory {
        private final EdcJsonLdLibraryAccessors laccForEdcJsonLdLibraryAccessors = new EdcJsonLdLibraryAccessors(owner);

        public EdcJsonLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.json.ld</b>
         */
        public EdcJsonLdLibraryAccessors getLd() {
            return laccForEdcJsonLdLibraryAccessors;
        }

    }

    public static class EdcJsonLdLibraryAccessors extends SubDependencyFactory {

        public EdcJsonLdLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>lib</b> with <b>org.eclipse.edc:json-ld-lib</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getLib() {
            return create("edc.json.ld.lib");
        }

        /**
         * Dependency provider for <b>spi</b> with <b>org.eclipse.edc:json-ld-spi</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getSpi() {
            return create("edc.json.ld.spi");
        }

    }

    public static class EdcManagementLibraryAccessors extends SubDependencyFactory {

        public EdcManagementLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.eclipse.edc:management-api</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getApi() {
            return create("edc.management.api");
        }

    }

    public static class EdcMicrometerLibraryAccessors extends SubDependencyFactory {

        public EdcMicrometerLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>core</b> with <b>org.eclipse.edc:micrometer-core</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getCore() {
            return create("edc.micrometer.core");
        }

    }

    public static class EdcMonitorLibraryAccessors extends SubDependencyFactory {
        private final EdcMonitorJdkLibraryAccessors laccForEdcMonitorJdkLibraryAccessors = new EdcMonitorJdkLibraryAccessors(owner);

        public EdcMonitorLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.monitor.jdk</b>
         */
        public EdcMonitorJdkLibraryAccessors getJdk() {
            return laccForEdcMonitorJdkLibraryAccessors;
        }

    }

    public static class EdcMonitorJdkLibraryAccessors extends SubDependencyFactory {

        public EdcMonitorJdkLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>logger</b> with <b>org.eclipse.edc:monitor-jdk-logger</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getLogger() {
            return create("edc.monitor.jdk.logger");
        }

    }

    public static class EdcProvisionLibraryAccessors extends SubDependencyFactory {
        private final EdcProvisionAwsLibraryAccessors laccForEdcProvisionAwsLibraryAccessors = new EdcProvisionAwsLibraryAccessors(owner);

        public EdcProvisionLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.provision.aws</b>
         */
        public EdcProvisionAwsLibraryAccessors getAws() {
            return laccForEdcProvisionAwsLibraryAccessors;
        }

    }

    public static class EdcProvisionAwsLibraryAccessors extends SubDependencyFactory {

        public EdcProvisionAwsLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>s3</b> with <b>org.eclipse.edc:provision-aws-s3</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getS3() {
            return create("edc.provision.aws.s3");
        }

    }

    public static class EdcRuntimeLibraryAccessors extends SubDependencyFactory {

        public EdcRuntimeLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>metamodel</b> with <b>org.eclipse.edc:runtime-metamodel</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getMetamodel() {
            return create("edc.runtime.metamodel");
        }

    }

    public static class EdcTransferLibraryAccessors extends SubDependencyFactory {
        private final EdcTransferDataLibraryAccessors laccForEdcTransferDataLibraryAccessors = new EdcTransferDataLibraryAccessors(owner);
        private final EdcTransferProcessLibraryAccessors laccForEdcTransferProcessLibraryAccessors = new EdcTransferProcessLibraryAccessors(owner);
        private final EdcTransferPullLibraryAccessors laccForEdcTransferPullLibraryAccessors = new EdcTransferPullLibraryAccessors(owner);

        public EdcTransferLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.transfer.data</b>
         */
        public EdcTransferDataLibraryAccessors getData() {
            return laccForEdcTransferDataLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.transfer.process</b>
         */
        public EdcTransferProcessLibraryAccessors getProcess() {
            return laccForEdcTransferProcessLibraryAccessors;
        }

        /**
         * Group of libraries at <b>edc.transfer.pull</b>
         */
        public EdcTransferPullLibraryAccessors getPull() {
            return laccForEdcTransferPullLibraryAccessors;
        }

    }

    public static class EdcTransferDataLibraryAccessors extends SubDependencyFactory {

        public EdcTransferDataLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>plane</b> with <b>org.eclipse.edc:transfer-data-plane</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getPlane() {
            return create("edc.transfer.data.plane");
        }

    }

    public static class EdcTransferProcessLibraryAccessors extends SubDependencyFactory {

        public EdcTransferProcessLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.eclipse.edc:transfer-process-api</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getApi() {
            return create("edc.transfer.process.api");
        }

    }

    public static class EdcTransferPullLibraryAccessors extends SubDependencyFactory {
        private final EdcTransferPullHttpLibraryAccessors laccForEdcTransferPullHttpLibraryAccessors = new EdcTransferPullHttpLibraryAccessors(owner);

        public EdcTransferPullLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Group of libraries at <b>edc.transfer.pull.http</b>
         */
        public EdcTransferPullHttpLibraryAccessors getHttp() {
            return laccForEdcTransferPullHttpLibraryAccessors;
        }

    }

    public static class EdcTransferPullHttpLibraryAccessors extends SubDependencyFactory {
        private final EdcTransferPullHttpDynamicLibraryAccessors laccForEdcTransferPullHttpDynamicLibraryAccessors = new EdcTransferPullHttpDynamicLibraryAccessors(owner);

        public EdcTransferPullHttpLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>receiver</b> with <b>org.eclipse.edc:transfer-pull-http-receiver</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getReceiver() {
            return create("edc.transfer.pull.http.receiver");
        }

        /**
         * Group of libraries at <b>edc.transfer.pull.http.dynamic</b>
         */
        public EdcTransferPullHttpDynamicLibraryAccessors getDynamic() {
            return laccForEdcTransferPullHttpDynamicLibraryAccessors;
        }

    }

    public static class EdcTransferPullHttpDynamicLibraryAccessors extends SubDependencyFactory {

        public EdcTransferPullHttpDynamicLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>receiver</b> with <b>org.eclipse.edc:transfer-pull-http-dynamic-receiver</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getReceiver() {
            return create("edc.transfer.pull.http.dynamic.receiver");
        }

    }

    public static class EdcVaultLibraryAccessors extends SubDependencyFactory {

        public EdcVaultLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>azure</b> with <b>org.eclipse.edc:vault-azure</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getAzure() {
            return create("edc.vault.azure");
        }

        /**
         * Dependency provider for <b>filesystem</b> with <b>org.eclipse.edc:vault-filesystem</b> coordinates and
         * with version reference <b>edc</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getFilesystem() {
            return create("edc.vault.filesystem");
        }

    }

    public static class JakartaLibraryAccessors extends SubDependencyFactory {

        public JakartaLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>rsApi</b> with <b>jakarta.ws.rs:jakarta.ws.rs-api</b> coordinates and
         * with version reference <b>rsApi</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getRsApi() {
            return create("jakarta.rsApi");
        }

    }

    public static class JunitLibraryAccessors extends SubDependencyFactory {
        private final JunitJupiterLibraryAccessors laccForJunitJupiterLibraryAccessors = new JunitJupiterLibraryAccessors(owner);

        public JunitLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>pioneer</b> with <b>org.junit-pioneer:junit-pioneer</b> coordinates and
         * with version reference <b>junit.pioneer</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getPioneer() {
            return create("junit.pioneer");
        }

        /**
         * Group of libraries at <b>junit.jupiter</b>
         */
        public JunitJupiterLibraryAccessors getJupiter() {
            return laccForJunitJupiterLibraryAccessors;
        }

    }

    public static class JunitJupiterLibraryAccessors extends SubDependencyFactory {

        public JunitJupiterLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>api</b> with <b>org.junit.jupiter:junit-jupiter-api</b> coordinates and
         * with version reference <b>jupiter</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getApi() {
            return create("junit.jupiter.api");
        }

        /**
         * Dependency provider for <b>engine</b> with <b>org.junit.jupiter:junit-jupiter-engine</b> coordinates and
         * with version reference <b>jupiter</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getEngine() {
            return create("junit.jupiter.engine");
        }

        /**
         * Dependency provider for <b>params</b> with <b>org.junit.jupiter:junit-jupiter-params</b> coordinates and
         * with version reference <b>jupiter</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getParams() {
            return create("junit.jupiter.params");
        }

    }

    public static class KafkaLibraryAccessors extends SubDependencyFactory {

        public KafkaLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>clients</b> with <b>org.apache.kafka:kafka-clients</b> coordinates and
         * with version reference <b>kafkaClients</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getClients() {
            return create("kafka.clients");
        }

    }

    public static class OkhttpLibraryAccessors extends SubDependencyFactory {

        public OkhttpLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>mockwebserver</b> with <b>com.squareup.okhttp3:mockwebserver</b> coordinates and
         * with version reference <b>okhttp.mockwebserver</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getMockwebserver() {
            return create("okhttp.mockwebserver");
        }

    }

    public static class OpentelemetryLibraryAccessors extends SubDependencyFactory {
        private final OpentelemetryExporterLibraryAccessors laccForOpentelemetryExporterLibraryAccessors = new OpentelemetryExporterLibraryAccessors(owner);

        public OpentelemetryLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>annotations</b> with <b>io.opentelemetry:opentelemetry-extension-annotations</b> coordinates and
         * with version <b>1.18.0</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getAnnotations() {
            return create("opentelemetry.annotations");
        }

        /**
         * Dependency provider for <b>javaagent</b> with <b>io.opentelemetry.javaagent:opentelemetry-javaagent</b> coordinates and
         * with version <b>2.3.0</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getJavaagent() {
            return create("opentelemetry.javaagent");
        }

        /**
         * Group of libraries at <b>opentelemetry.exporter</b>
         */
        public OpentelemetryExporterLibraryAccessors getExporter() {
            return laccForOpentelemetryExporterLibraryAccessors;
        }

    }

    public static class OpentelemetryExporterLibraryAccessors extends SubDependencyFactory {

        public OpentelemetryExporterLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>jaeger</b> with <b>io.opentelemetry:opentelemetry-exporter-jaeger</b> coordinates and
         * with version <b>1.34.1</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getJaeger() {
            return create("opentelemetry.exporter.jaeger");
        }

    }

    public static class TestcontainersLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {
        private final TestcontainersJunitLibraryAccessors laccForTestcontainersJunitLibraryAccessors = new TestcontainersJunitLibraryAccessors(owner);

        public TestcontainersLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>testcontainers</b> with <b>org.testcontainers:testcontainers</b> coordinates and
         * with version reference <b>testcontainers</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> asProvider() {
            return create("testcontainers");
        }

        /**
         * Dependency provider for <b>kafka</b> with <b>org.testcontainers:kafka</b> coordinates and
         * with version reference <b>testcontainers</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getKafka() {
            return create("testcontainers.kafka");
        }

        /**
         * Group of libraries at <b>testcontainers.junit</b>
         */
        public TestcontainersJunitLibraryAccessors getJunit() {
            return laccForTestcontainersJunitLibraryAccessors;
        }

    }

    public static class TestcontainersJunitLibraryAccessors extends SubDependencyFactory implements DependencyNotationSupplier {

        public TestcontainersJunitLibraryAccessors(AbstractExternalDependencyFactory owner) { super(owner); }

        /**
         * Dependency provider for <b>junit</b> with <b>org.testcontainers:junit-jupiter</b> coordinates and
         * with version reference <b>testcontainers</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> asProvider() {
            return create("testcontainers.junit");
        }

        /**
         * Dependency provider for <b>jupiter</b> with <b>org.testcontainers:junit-jupiter</b> coordinates and
         * with version reference <b>testcontainers</b>
         * <p>
         * This dependency was declared in catalog libs.versions.toml
         */
        public Provider<MinimalExternalModuleDependency> getJupiter() {
            return create("testcontainers.junit.jupiter");
        }

    }

    public static class VersionAccessors extends VersionFactory  {

        private final JakartaVersionAccessors vaccForJakartaVersionAccessors = new JakartaVersionAccessors(providers, config);
        private final JunitVersionAccessors vaccForJunitVersionAccessors = new JunitVersionAccessors(providers, config);
        private final OkhttpVersionAccessors vaccForOkhttpVersionAccessors = new OkhttpVersionAccessors(providers, config);
        public VersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Version alias <b>assertj</b> with value <b>3.25.3</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getAssertj() { return getVersion("assertj"); }

        /**
         * Version alias <b>awaitility</b> with value <b>4.2.1</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getAwaitility() { return getVersion("awaitility"); }

        /**
         * Version alias <b>edc</b> with value <b>0.6.0</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getEdc() { return getVersion("edc"); }

        /**
         * Version alias <b>jupiter</b> with value <b>5.10.2</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getJupiter() { return getVersion("jupiter"); }

        /**
         * Version alias <b>kafkaClients</b> with value <b>3.7.0</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getKafkaClients() { return getVersion("kafkaClients"); }

        /**
         * Version alias <b>restAssured</b> with value <b>5.4.0</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getRestAssured() { return getVersion("restAssured"); }

        /**
         * Version alias <b>rsApi</b> with value <b>3.1.0</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getRsApi() { return getVersion("rsApi"); }

        /**
         * Version alias <b>testcontainers</b> with value <b>1.19.7</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getTestcontainers() { return getVersion("testcontainers"); }

        /**
         * Group of versions at <b>versions.jakarta</b>
         */
        public JakartaVersionAccessors getJakarta() {
            return vaccForJakartaVersionAccessors;
        }

        /**
         * Group of versions at <b>versions.junit</b>
         */
        public JunitVersionAccessors getJunit() {
            return vaccForJunitVersionAccessors;
        }

        /**
         * Group of versions at <b>versions.okhttp</b>
         */
        public OkhttpVersionAccessors getOkhttp() {
            return vaccForOkhttpVersionAccessors;
        }

    }

    public static class JakartaVersionAccessors extends VersionFactory  {

        public JakartaVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Version alias <b>jakarta.json</b> with value <b>2.0.1</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getJson() { return getVersion("jakarta.json"); }

    }

    public static class JunitVersionAccessors extends VersionFactory  {

        public JunitVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Version alias <b>junit.pioneer</b> with value <b>2.2.0</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getPioneer() { return getVersion("junit.pioneer"); }

    }

    public static class OkhttpVersionAccessors extends VersionFactory  {

        public OkhttpVersionAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Version alias <b>okhttp.mockwebserver</b> with value <b>5.0.0-alpha.14</b>
         * <p>
         * If the version is a rich version and cannot be represented as a
         * single version string, an empty string is returned.
         * <p>
         * This version was declared in catalog libs.versions.toml
         */
        public Provider<String> getMockwebserver() { return getVersion("okhttp.mockwebserver"); }

    }

    public static class BundleAccessors extends BundleFactory {

        public BundleAccessors(ObjectFactory objects, ProviderFactory providers, DefaultVersionCatalog config, ImmutableAttributesFactory attributesFactory, CapabilityNotationParser capabilityNotationParser) { super(objects, providers, config, attributesFactory, capabilityNotationParser); }

    }

    public static class PluginAccessors extends PluginFactory {

        public PluginAccessors(ProviderFactory providers, DefaultVersionCatalog config) { super(providers, config); }

        /**
         * Plugin provider for <b>shadow</b> with plugin id <b>com.github.johnrengelman.shadow</b> and
         * with version <b>8.1.1</b>
         * <p>
         * This plugin was declared in catalog libs.versions.toml
         */
        public Provider<PluginDependency> getShadow() { return createPlugin("shadow"); }

    }

}
