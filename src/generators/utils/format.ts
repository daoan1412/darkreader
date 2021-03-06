interface SiteFix {
    url: string[];
    [prop: string]: any;
}

interface SitesFixesFormatOptions {
    props: string[];
    getPropCommandName: (prop: string) => string;
    formatPropValue: (prop: string, value) => string;
    shouldIgnoreProp: (props: string, value) => boolean;
}

export function formatSitesFixesConfig(fixes: SiteFix[], options: SitesFixesFormatOptions) {
    const lines: string[] = [];

    fixes.forEach((fix, i) => {
        lines.push(...fix.url);
        options.props.forEach((prop) => {
            const command = options.getPropCommandName(prop);
            const value = fix[prop];
            if (options.shouldIgnoreProp(prop, value)) {
                return;
            }
            lines.push('');
            lines.push(command);
            const formattedValue = options.formatPropValue(prop, value);
            if (formattedValue) {
                lines.push(formattedValue);
            }
        });
        if (i < fixes.length - 1) {
            lines.push('');
            lines.push(Array.from({length: 32}).fill('=').join(''));
            lines.push('');
        }
    });

    lines.push('');
    return lines.join('\n');
}
