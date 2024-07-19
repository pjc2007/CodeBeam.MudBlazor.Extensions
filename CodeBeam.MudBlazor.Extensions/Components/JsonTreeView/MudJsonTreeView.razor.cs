using Microsoft.AspNetCore.Components;
using MudBlazor;
using System.Text.Json.Nodes;

namespace MudExtensions;

#nullable enable

/// <summary>
/// Represents a tree view which displays a snippet of JSON.
/// </summary>
public partial class MudJsonTreeView : MudComponentBase
{
    private string? _json;

    /// <summary>
    /// Gets or sets the JSON to be displayed.
    /// </summary>
    [Parameter]
    [EditorRequired]
    public string? Json 
    {
        get => _json;
        set => SetJson(value);
    }

    /// <summary>
    /// Sets the <see cref="Json"/> property and raises the <see cref="OnJsonChanged"/> event.
    /// </summary>
    /// <param name="json">The new JSON to use.</param>
    protected void SetJson(string? json)
    {
        _json = json;
        Root = string.IsNullOrEmpty(_json) ? null : JsonNode.Parse(_json);
        OnJsonChanged.InvokeAsync(_json);
        StateHasChanged();
    }

    /// <summary>
    /// Occurs when the JSON has changed.
    /// </summary>
    public EventCallback<string> OnJsonChanged { get; set; }

    /// <summary>
    /// Gets or sets the root node of the JSON to display.
    /// </summary>
    public JsonNode? Root { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the tree contents are compacted.
    /// </summary>
    [Parameter]
    public bool Dense { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the current row is highlighted.
    /// </summary>
    [Parameter]
    public bool Hover { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether items are sorted by key.
    /// </summary>
    [Parameter]
    public bool Sorted { get; set; }
}
