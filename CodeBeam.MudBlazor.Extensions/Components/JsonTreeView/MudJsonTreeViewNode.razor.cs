using Microsoft.AspNetCore.Components;
using System.Text.Json.Nodes;

namespace MudExtensions;

#nullable enable

/// <summary>
/// Represents the child leaf of a JSON tree view.
/// </summary>
public partial class MudJsonTreeViewNode : ComponentBase
{
    /// <summary>
    /// Gets or sets the node to display (including children).
    /// </summary>
    [Parameter]
    [EditorRequired]
    public JsonNode? Node { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether items are sorted by key.
    /// </summary>
    [Parameter]
    public bool Sorted { get; set; }
}
